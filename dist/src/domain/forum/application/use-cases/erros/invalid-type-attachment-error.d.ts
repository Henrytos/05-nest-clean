import { UseCaseError } from '@/core/errors/use-case-error';
export declare class InvalidTypeAttachmentError extends Error implements UseCaseError {
    constructor(type: string);
}
