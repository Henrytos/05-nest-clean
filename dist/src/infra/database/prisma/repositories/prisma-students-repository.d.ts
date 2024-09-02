import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaService } from '../prisma.service';
import { Student } from '@/domain/forum/enterprise/entities/student';
export declare class PrismaStudentsRepository implements StudentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<Student | null>;
    create(student: Student): Promise<void>;
}
