import { AnswersRepository } from '../repositories/answers-repository';
import { Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteAnswerUseCase {
    private answerRepository;
    constructor(answerRepository: AnswersRepository);
    execute({ authorId, answerId, }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse>;
}
export {};
