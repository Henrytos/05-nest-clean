import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { Prisma, Attachment as PrismaAttchment } from '@prisma/client';
export declare class PrismaQuestionAttachmentMapper {
    static toDomain(raw: PrismaAttchment): QuestionAttachment;
    static toPrismaUpdateMany(attachments: QuestionAttachment[]): Prisma.AttachmentUpdateManyArgs;
}
