import { Either } from '@/core/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';
interface FetchAnswerCommentsUseCaseRequest {
    answerId: string;
    page: number;
}
type FetchAnswerCommentsUseCaseResponse = Either<null, {
    comments: CommentWithAuthor[];
}>;
export declare class FetchAnswerCommentsUseCase {
    private answerCommentsRepository;
    constructor(answerCommentsRepository: AnswerCommentsRepository);
    execute({ answerId, page, }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse>;
}
export {};
