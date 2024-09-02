import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { Question as PrismaQuestion, User as PrismaUser, Attachment as PrismaAttachment } from '@prisma/client';
type PrismaQuestionDetails = PrismaQuestion & {
    author: PrismaUser;
    attachments: PrismaAttachment[];
};
export declare class PrismaQuestionDetailsMapper {
    static toDomain(raw: PrismaQuestionDetails): QuestionDetails;
}
export {};
