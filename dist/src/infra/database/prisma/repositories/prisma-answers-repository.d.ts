import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PrismaService } from '../prisma.service';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
export declare class PrismaAnswersRepository implements AnswersRepository {
    private prisma;
    private answerAttachments;
    constructor(prisma: PrismaService, answerAttachments: AnswerAttachmentsRepository);
    findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]>;
    findById(id: string): Promise<Answer>;
    create(answer: Answer): Promise<void>;
    delete(answer: Answer): Promise<void>;
    save(answer: Answer): Promise<void>;
    findManyRecent({ page }: PaginationParams): Promise<Answer[]>;
}
