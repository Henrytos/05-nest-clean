import { Either } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository';
interface EditAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
    attachmentsIds: string[];
}
type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer: Answer;
}>;
export declare class EditAnswerUseCase {
    private answersRepository;
    private answerAttachmentsRepository;
    constructor(answersRepository: AnswersRepository, answerAttachmentsRepository: AnswerAttachmentsRepository);
    execute({ authorId, answerId, content, attachmentsIds, }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>;
}
export {};
