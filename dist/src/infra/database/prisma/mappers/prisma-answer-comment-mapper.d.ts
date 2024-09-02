import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { Prisma, Comment as PrismaComment } from '@prisma/client';
export declare class PrismaAnswerCommentMapper {
    static toDomain(raw: PrismaComment): AnswerComment;
    static toPrisma(answercomment: AnswerComment): Prisma.CommentUncheckedCreateInput;
}
