import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { DomainEvents } from '@/core/events/domain-events';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachments: AnswerAttachmentsRepository,
  ) {}

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

    await this.answerAttachments.createMany(answer.attachments.currentItems);
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }
  async delete(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.answerAttachments.deleteManyByAnswerId(answer.id.toString());

    await this.prisma.answer.delete({
      where: {
        id: data.id,
      },
    });
  }
  async save(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await Promise.all([
      this.answerAttachments.deleteMany(answer.attachments.getRemovedItems()),

      this.answerAttachments.createMany(answer.attachments.getNewItems()),

      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data,
      }),
    ]);
    DomainEvents.dispatchEventsForAggregate(answer.id);
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
