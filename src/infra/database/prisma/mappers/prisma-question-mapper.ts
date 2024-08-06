import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Prisma, Question as PrismaQuestion } from "@prisma/client";

export class PrismaQuestionMapper {

  static toDomain(raw: PrismaQuestion): Question { 
    return Question.create({
      authorId: new UniqueEntityID(raw.authorId),
      content: raw.content,
      title: raw.title,
      attachments: undefined,
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ? raw.updatedAt : null,
      slug: Slug.create(raw.slug),
    })
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id:question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      updatedAt: question.updatedAt,
      createdAt: question.createdAt,
    }
   }

}