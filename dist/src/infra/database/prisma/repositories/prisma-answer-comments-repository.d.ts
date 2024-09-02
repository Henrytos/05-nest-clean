import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PrismaService } from '../prisma.service';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
export declare class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(answerComment: AnswerComment): Promise<void>;
    findById(id: string): Promise<AnswerComment>;
    delete(answerComment: AnswerComment): Promise<void>;
    findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]>;
    findManyByAnswerIdWithAuthor(answerId: string, { page }: PaginationParams): Promise<CommentWithAuthor[]>;
}
