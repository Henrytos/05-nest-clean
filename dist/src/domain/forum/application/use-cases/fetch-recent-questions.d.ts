import { Either } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-repository';
interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}
type FetchRecentQuestionsUseCaseResponse = Either<null, {
    questions: Question[];
}>;
export declare class FetchRecentQuestionsUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ page, }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse>;
}
export {};
