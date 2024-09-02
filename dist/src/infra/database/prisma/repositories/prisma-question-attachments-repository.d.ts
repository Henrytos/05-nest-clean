import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { PrismaService } from '../prisma.service';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
export declare class PrismaQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    createMany(attachments: QuestionAttachment[]): Promise<void>;
    deleteMany(attachments: QuestionAttachment[]): Promise<void>;
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
    deleteManyByQuestionId(questionId: string): Promise<void>;
}
