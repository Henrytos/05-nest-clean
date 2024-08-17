import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

import { Prisma, Attachment as PrismaAttchment } from '@prisma/client';

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttchment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('AansweId is required');
    }
    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityID(raw.answerId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrismaUpdateMany(
    attachements: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachementIds = attachements.map((attachment) =>
      attachment.id.toString(),
    );
    return {
      data: {
        answerId: attachements[0].answerId.toString(),
      },
      where: {
        id: {
          in: attachementIds,
        },
      },
    };
  }
}
