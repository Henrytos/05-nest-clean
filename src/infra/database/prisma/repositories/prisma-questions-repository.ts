import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const question = await this.prisma.question.findFirst({
      where: {
        slug,
      },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  async findById(id: string) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  async create(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question);
    await this.prisma.question.create({
      data,
    });
  }
  async delete(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    });
  }
  async save(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return questions.map(PrismaQuestionMapper.toDomain);
  }
}
