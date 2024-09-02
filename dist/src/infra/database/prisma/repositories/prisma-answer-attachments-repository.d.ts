import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { PrismaService } from '../prisma.service';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
export declare class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    createMany(attachments: AnswerAttachment[]): Promise<void>;
    deleteMany(attachments: AnswerAttachment[]): Promise<void>;
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
    deleteManyByAnswerId(answerId: string): Promise<void>;
}
