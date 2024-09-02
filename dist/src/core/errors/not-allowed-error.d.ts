import { UseCaseError } from '@/core/errors/use-case-error';
export declare class NotAllowedError extends Error implements UseCaseError {
    constructor();
}
