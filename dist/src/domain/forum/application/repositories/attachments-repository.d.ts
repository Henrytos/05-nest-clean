import { Attachment } from '../../enterprise/entities/attachment';
export declare abstract class AttachmentsRepository {
    abstract create(attachment: Attachment): Promise<void>;
}
