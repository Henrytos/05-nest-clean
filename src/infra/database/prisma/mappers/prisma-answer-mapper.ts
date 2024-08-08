import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Prisma, Answer as PrismaAnswer } from '@prisma/client';
export class PrismaAnswerMapper {
  toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
  toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      questionId: answer.questionId.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }
}
