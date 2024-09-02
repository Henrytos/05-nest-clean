import { Either } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}>;
export declare class ChooseQuestionBestAnswerUseCase {
    private answersRepository;
    private questionsRepository;
    constructor(answersRepository: AnswersRepository, questionsRepository: QuestionsRepository);
    execute({ authorId, answerId, }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse>;
}
export {};
