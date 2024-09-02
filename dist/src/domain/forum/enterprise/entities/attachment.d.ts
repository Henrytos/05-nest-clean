import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface AttachmentProps {
    title: string;
    url: string;
}
export declare class Attachment extends Entity<AttachmentProps> {
    get title(): string;
    get url(): string;
    static create(props: AttachmentProps, id?: UniqueEntityID): Attachment;
}
