import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface QuestionAttachmentProps {
    questionId: UniqueEntityID;
    attachmentId: UniqueEntityID;
}
export declare class QuestionAttachment extends Entity<QuestionAttachmentProps> {
    get questionId(): UniqueEntityID;
    get attachmentId(): UniqueEntityID;
    static create(props: QuestionAttachmentProps, id?: UniqueEntityID): QuestionAttachment;
}
