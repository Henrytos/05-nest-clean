import { Slug } from './value-objects/slug';
import { Optional } from '@/core/types/optional';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { QuestionAttachmentList } from './question-attachment-list';
export interface QuestionProps {
    authorId: UniqueEntityID;
    bestAnswerId?: UniqueEntityID | null;
    content: string;
    slug: Slug;
    title: string;
    attachments?: QuestionAttachmentList;
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class Question extends AggregateRoot<QuestionProps> {
    get authorId(): UniqueEntityID;
    get bestAnswerId(): UniqueEntityID | undefined;
    get content(): string;
    get slug(): Slug;
    get title(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    private touch;
    get isNew(): boolean;
    get excerpt(): string;
    set content(content: string);
    set title(title: string);
    get attachments(): QuestionAttachmentList;
    set attachments(attachments: QuestionAttachmentList);
    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined);
    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityID): Question;
}
