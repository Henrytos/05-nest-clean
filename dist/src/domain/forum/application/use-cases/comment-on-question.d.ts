import { QuestionsRepository } from '../repositories/question-repository';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
interface CommentOnQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
    content: string;
}
type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment;
}>;
export declare class CommentOnQuestionUseCase {
    private questionsRepository;
    private questionCommentsRepository;
    constructor(questionsRepository: QuestionsRepository, questionCommentsRepository: QuestionCommentsRepository);
    execute({ authorId, questionId, content, }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse>;
}
export {};
