import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidTypeAttachmentError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`The attachment type "${type}" is invalid.`);
  }
}
