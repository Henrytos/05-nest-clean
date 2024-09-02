import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
interface CommentOnAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
    content: string;
}
type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment;
}>;
export declare class CommentOnAnswerUseCase {
    private answersRepository;
    private answerCommentsRepository;
    constructor(answersRepository: AnswersRepository, answerCommentsRepository: AnswerCommentsRepository);
    execute({ authorId, answerId, content, }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>;
}
export {};
