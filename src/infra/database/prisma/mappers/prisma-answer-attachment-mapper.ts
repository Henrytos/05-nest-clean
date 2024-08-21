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

  static toPrisma(attachment: AnswerAttachment): Prisma.AttachmentUpdateArgs {
    return {
      data: {
        answerId: attachment.answerId.toString(),
      },
      where: {
        id: attachment.id.toString(),
      },
    };
  }

  static toPrismaUpdateMany(
    attachments: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map((attachment) =>
      attachment.attachmentId.toString(),
    );
    return {
      where: {
        id: {
          in: attachmentsIds,
        },
      },
      data: {
        answerId: attachments[0].answerId.toString(),
      },
    };
  }
}
