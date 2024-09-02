import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Prisma, Answer as PrismaAnswer } from '@prisma/client';
export declare class PrismaAnswerMapper {
    static toDomain(raw: PrismaAnswer): Answer;
    static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput;
}
