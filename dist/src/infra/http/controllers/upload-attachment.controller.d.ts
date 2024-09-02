import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment';
export declare class UploadAttachmentControllert {
    private uploadAndCreateAttachment;
    constructor(uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase);
    uploadFile(file: Express.Multer.File): Promise<{
        attachment_id: string;
    }>;
}
