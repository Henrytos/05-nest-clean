import { Either } from '@/core/either';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';
interface FetchQuestionCommentsUseCaseRequest {
    questionId: string;
    page: number;
}
type FetchQuestionCommentsUseCaseResponse = Either<null, {
    comments: CommentWithAuthor[];
}>;
export declare class FetchQuestionCommentsUseCase {
    private questionCommentsRepository;
    constructor(questionCommentsRepository: QuestionCommentsRepository);
    execute({ questionId, page, }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse>;
}
export {};
