import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
export interface AnswerCommentProps {
    authorId: UniqueEntityID;
    answerId: UniqueEntityID;
    content: string;
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class AnswerComment extends Entity<AnswerCommentProps> {
    get authorId(): UniqueEntityID;
    get content(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    private touch;
    set content(content: string);
    static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityID): AnswerComment;
}
