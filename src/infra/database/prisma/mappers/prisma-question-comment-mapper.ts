import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { Prisma, Comment as PrismaComment } from '@prisma/client';

export class PrismaQuestionCommentMapper {
  toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('QuestionId is required');
    }

    return QuestionComment.create(
      {
        questionId: new UniqueEntityID(raw.answerId),
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
  toPrisma(
    questioncomment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questioncomment.id.toString(),
      answerId: questioncomment.questionId.toString(),
      authorId: questioncomment.authorId.toString(),
      content: questioncomment.content,
      createdAt: questioncomment.createdAt,
      updatedAt: questioncomment.updatedAt,
    };
  }
}
