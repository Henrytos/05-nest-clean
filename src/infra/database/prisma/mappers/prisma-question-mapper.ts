import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Prisma, Question as QuestionPrisma } from "@prisma/client";

export class PrismaQuestionMapper {
  static toDomain(raw: QuestionPrisma) {
    const question = Question.create({
      authorId: new UniqueEntityID(raw.authorId),
      content: raw.content,
      title: raw.title,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      slug: Slug.create(raw.slug),
    });

    return question;
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    const questionPrisma: Prisma.QuestionUncheckedCreateInput = {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      content: question.content,
      title: question.title,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };

    return questionPrisma;
  }
}
