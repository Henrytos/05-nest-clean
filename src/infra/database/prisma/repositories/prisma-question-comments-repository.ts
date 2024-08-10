import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper';

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(questionComment: QuestionComment) {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment);
    await this.prisma.comment.create({
      data,
    });
  }
  async findById(id: string) {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!questionComment) {
      return null;
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment);
  }
  async delete(questionComment: QuestionComment) {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    });
  }
  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionsComments = await this.prisma.comment.findMany({
      take: 20,
      skip: (page - 1) * 20,
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return questionsComments.map(PrismaQuestionCommentMapper.toDomain);
  }
}
