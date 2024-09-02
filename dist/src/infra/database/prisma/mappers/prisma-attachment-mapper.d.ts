import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { Prisma } from '@prisma/client';
import { Attachment as PrismaAttachment } from '@prisma/client';
export declare class PrismaAttachmentMapper {
    static toDomain(raw: PrismaAttachment): Attachment;
    static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput;
}
