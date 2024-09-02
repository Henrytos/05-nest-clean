import { Student } from '../../enterprise/entities/student';
export declare abstract class StudentsRepository {
    abstract findByEmail(email: string): Promise<Student | null>;
    abstract create(student: Student): Promise<void>;
}
