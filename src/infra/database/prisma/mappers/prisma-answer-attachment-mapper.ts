import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

import { Attachment as PrismaAttchment } from '@prisma/client';

export class PrismaAnswerAttachmentMapper {
  toDomain(raw: PrismaAttchment): AnswerAttachment {
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
}
