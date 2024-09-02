import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AnswerAttachmentList } from './answer-attachment-list';
import { AggregateRoot } from '@/core/entities/aggregate-root';
export interface AnswerProps {
    content: string;
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    attachments: AnswerAttachmentList;
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class Answer extends AggregateRoot<AnswerProps> {
    get authorId(): UniqueEntityID;
    get questionId(): UniqueEntityID;
    get content(): string;
    get attachments(): AnswerAttachmentList;
    get updatedAt(): Date;
    get createdAt(): Date;
    private touch;
    set content(content: string);
    set attachments(attachments: AnswerAttachmentList);
    get excerpt(): string;
    static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID): Answer;
}
