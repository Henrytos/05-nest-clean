import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface StudentProps {
    name: string;
    password: string;
    email: string;
}
export declare class Student extends Entity<StudentProps> {
    get email(): string;
    get name(): string;
    get password(): string;
    static create(props: StudentProps, id?: UniqueEntityID): Student;
}
