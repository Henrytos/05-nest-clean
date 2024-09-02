import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface AnswerAttachmentProps {
    answerId: UniqueEntityID;
    attachmentId: UniqueEntityID;
}
export declare class AnswerAttachment extends Entity<AnswerAttachmentProps> {
    get answerId(): UniqueEntityID;
    get attachmentId(): UniqueEntityID;
    static create(props: AnswerAttachmentProps, id?: UniqueEntityID): AnswerAttachment;
}
