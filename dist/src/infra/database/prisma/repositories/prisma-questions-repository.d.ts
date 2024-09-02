import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaService } from '../prisma.service';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
export declare class PrismaQuestionsRepository implements QuestionsRepository {
    private prisma;
    private questionAttachments;
    constructor(prisma: PrismaService, questionAttachments: QuestionAttachmentsRepository);
    findBySlug(slug: string): Promise<Question>;
    findDetailsBySlug(slug: string): Promise<QuestionDetails | null>;
    findById(id: string): Promise<Question>;
    create(question: Question): Promise<void>;
    delete(question: Question): Promise<void>;
    save(question: Question): Promise<void>;
    findManyRecent({ page }: PaginationParams): Promise<Question[]>;
}
