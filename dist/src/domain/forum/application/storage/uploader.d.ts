export interface UploadParams {
    fileName: string;
    fileType: string;
    body: Buffer;
}
export declare abstract class Uploader {
    abstract upload(params: UploadParams): Promise<{
        url: string;
    }>;
}
