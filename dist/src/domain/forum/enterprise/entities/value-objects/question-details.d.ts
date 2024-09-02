import { ValueObject } from '@/core/entities/value-object';
import { Slug } from './slug';
import { Attachment } from '../attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
interface QuestionDetailsProps {
    questionId: UniqueEntityID;
    authorId: UniqueEntityID;
    title: string;
    content: string;
    author: string;
    bestAnswerId?: UniqueEntityID;
    slug: Slug;
    attachments: Attachment[];
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class QuestionDetails extends ValueObject<QuestionDetailsProps> {
    get questionId(): UniqueEntityID;
    get authorId(): UniqueEntityID;
    get title(): string;
    get content(): string;
    get author(): string;
    get slug(): Slug;
    get bestAnswerId(): UniqueEntityID;
    get attachments(): Attachment[];
    get createdAt(): Date;
    get updatedAt(): Date;
    static create(questionDatails: QuestionDetailsProps): QuestionDetails;
}
export {};
