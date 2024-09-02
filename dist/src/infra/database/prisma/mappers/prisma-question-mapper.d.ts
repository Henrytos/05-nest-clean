import { Question } from '@/domain/forum/enterprise/entities/question';
import { Prisma, Question as PrismaQuestion } from '@prisma/client';
export declare class PrismaQuestionMapper {
    static toDomain(raw: PrismaQuestion): Question;
    static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput;
}
