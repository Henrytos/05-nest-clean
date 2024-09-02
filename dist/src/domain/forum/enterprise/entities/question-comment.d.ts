import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Comment, CommentProps } from './comment';
export interface QuestionCommentProps extends CommentProps {
    questionId: UniqueEntityID;
}
export declare class QuestionComment extends Comment<QuestionCommentProps> {
    get questionId(): UniqueEntityID;
    static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID): QuestionComment;
}
