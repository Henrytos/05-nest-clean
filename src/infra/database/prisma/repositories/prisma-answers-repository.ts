import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }

  async findById(id: string) {
    const answer = await this.prisma.answer.findFirst({
      where: {
        id,
      },
    });

    if (!answer) {
      return null;
    }

    return PrismaAnswerMapper.toDomain(answer);
  }

  async create(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer);
    await this.prisma.answer.create({
      data,
    });
  }
  async delete(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.delete({
      where: {
        id: data.id,
      },
    });
  }
  async save(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findManyRecent({ page }: PaginationParams) {
    const answers = await this.prisma.answer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }
}
