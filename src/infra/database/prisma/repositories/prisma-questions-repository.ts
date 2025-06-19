import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { PrismaQuestionDetailsMapper } from '../mappers/value-objects/question-details-mapper';
import { DomainEvents } from '@/core/events/domain-events';
import { CacheRepository } from '@/infra/cache/cache-repository';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
    private cache: CacheRepository
  ) {}

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

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const cacheHit = await this.cache.get(`question:${slug}:details`);

    if(cacheHit){
      return JSON.parse(cacheHit)
    }
    
    
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachments: true,
      },
    });

    if (!question) {
      return null;
    }

    const questionDetails =  PrismaQuestionDetailsMapper.toDomain(question)

    await this.cache.set(`question:${slug}:details`, JSON.stringify(questionDetails))

    return questionDetails;
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
    await this.questionAttachments.createMany(question.attachments.getItems());
  }
  async delete(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.questionAttachments.deleteMany(
      question.attachments.getRemovedItems(),
    );

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    });
  }
  async save(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question);

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: question.id.toString(),
        },
        data,
      }),

      this.questionAttachments.createMany(question.attachments.getNewItems()),

      this.questionAttachments.deleteMany(
        question.attachments.getRemovedItems(),
      ),
      this.cache.delete(`question:${question.slug.value}:details`)
    ]);

    DomainEvents.dispatchEventsForAggregate(question.id);
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
