import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PrismaService } from '../prisma.service';
export declare class PrismaQuestionCommentsRepository implements QuestionCommentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(questionComment: QuestionComment): Promise<void>;
    findById(id: string): Promise<QuestionComment>;
    delete(questionComment: QuestionComment): Promise<void>;
    findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]>;
    findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams): Promise<import("../../../../domain/forum/enterprise/entities/value-objects/comment-with-author").CommentWithAuthor[]>;
}
