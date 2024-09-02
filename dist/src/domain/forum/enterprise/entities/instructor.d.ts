import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
interface InstructorProps {
    name: string;
}
export declare class Instructor extends Entity<InstructorProps> {
    static create(props: InstructorProps, id?: UniqueEntityID): Instructor;
}
export {};
