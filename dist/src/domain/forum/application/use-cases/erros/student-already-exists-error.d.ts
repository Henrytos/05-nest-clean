import { UseCaseError } from '@/core/errors/use-case-error';
export declare class StudentAlreadyExistsError extends Error implements UseCaseError {
    constructor(identifier: string);
}
