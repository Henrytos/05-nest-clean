import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either } from '@/core/either';
interface AnswerQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
    attachmentsIds: string[];
}
type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer;
}>;
export declare class AnswerQuestionUseCase {
    private answersRepository;
    constructor(answersRepository: AnswersRepository);
    execute({ authorId, questionId, content, attachmentsIds, }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse>;
}
export {};
