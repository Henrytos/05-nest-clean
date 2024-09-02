import { Either } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
interface FetchQuestionAnswersUseCaseRequest {
    questionId: string;
    page: number;
}
type FetchQuestionAnswersUseCaseResponse = Either<null, {
    answers: Answer[];
}>;
export declare class FetchQuestionAnswersUseCase {
    private answerRepository;
    constructor(answerRepository: AnswersRepository);
    execute({ questionId, page, }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse>;
}
export {};
