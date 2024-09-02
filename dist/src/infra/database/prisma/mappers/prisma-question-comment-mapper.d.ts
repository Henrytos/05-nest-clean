import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { Prisma, Comment as PrismaComment } from '@prisma/client';
export declare class PrismaQuestionCommentMapper {
    static toDomain(raw: PrismaComment): QuestionComment;
    static toPrisma(questioncomment: QuestionComment): Prisma.CommentUncheckedCreateInput;
}
