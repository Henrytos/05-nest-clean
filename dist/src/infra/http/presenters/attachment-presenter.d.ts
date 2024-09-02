import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
export declare class AttachmentPresenter {
    static toHTTP(attachment: Attachment): {
        id: string;
        title: string;
        url: string;
    };
}
