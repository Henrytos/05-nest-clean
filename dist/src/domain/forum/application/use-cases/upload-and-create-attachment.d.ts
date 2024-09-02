import { Either } from '@/core/either';
import { StudentAlreadyExistsError } from './erros/student-already-exists-error';
import { Attachment } from '../../enterprise/entities/attachment';
import { AttachmentsRepository } from '../repositories/attachments-repository';
import { Uploader } from '../storage/uploader';
interface UploadAndCreateAttachmentUseCaseRequest {
    fileName: string;
    fileType: string;
    body: Buffer;
}
type UploadAndCreateAttachmentUseCaseResponse = Either<StudentAlreadyExistsError, {
    attachment: Attachment;
}>;
export declare class UploadAndCreateAttachmentUseCase {
    private attachmentRespository;
    private uploader;
    constructor(attachmentRespository: AttachmentsRepository, uploader: Uploader);
    execute({ fileName, fileType, body, }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse>;
}
export {};
