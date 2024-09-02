import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { Prisma, Attachment as PrismaAttchment } from '@prisma/client';
export declare class PrismaAnswerAttachmentMapper {
    static toDomain(raw: PrismaAttchment): AnswerAttachment;
    static toPrisma(attachment: AnswerAttachment): Prisma.AttachmentUpdateArgs;
    static toPrismaUpdateMany(attachments: AnswerAttachment[]): Prisma.AttachmentUpdateManyArgs;
}
