import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { PrismaService } from '../prisma.service';
export declare class PrismaAttachmentsRepository implements AttachmentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(attachment: Attachment): Promise<void>;
}
