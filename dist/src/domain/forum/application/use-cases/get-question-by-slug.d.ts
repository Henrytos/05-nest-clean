import { Either } from '@/core/either';
import { QuestionsRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';
interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}
type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
    question: QuestionDetails;
}>;
export declare class GetQuestionBySlugUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ slug, }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse>;
}
export {};
