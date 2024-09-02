import { Either } from '@/core/either';
import { QuestionsRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}
type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteQuestionUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ authorId, questionId, }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse>;
}
export {};
