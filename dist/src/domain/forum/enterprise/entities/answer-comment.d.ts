import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { CommentProps, Comment } from './comment';
export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityID;
}
export declare class AnswerComment extends Comment<AnswerCommentProps> {
    get answerId(): UniqueEntityID;
    static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityID): AnswerComment;
}
