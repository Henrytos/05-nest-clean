import { Student } from '@/domain/forum/enterprise/entities/student';
import { Prisma, User as PrismaUser } from '@prisma/client';
export declare class PrismaStudentMapper {
    static toDomain(raw: PrismaUser): Student;
    static toPrisma(student: Student): Prisma.UserUncheckedCreateInput;
}
