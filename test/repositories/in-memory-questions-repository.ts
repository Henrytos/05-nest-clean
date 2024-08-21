import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository';
import { InMemoryStudentsRepository } from './in-memory-students-repository';
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repostory';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { aE } from 'vitest/dist/reporters-yx5ZTtEV';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentRepository: InMemoryStudentsRepository,
  ) {}

  async create(question: Question) {
    this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    );
    this.items.push(question);
    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );
    this.items[itemIndex] = question;

    this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems(),
    );

    this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(),
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);
    if (!question) {
      return null;
    }

    return question;
  }

  async findDetailsBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    const author = await this.studentRepository.items.find((item) => {
      return item.id.equals(question.authorId);
    });

    if (!author) {
      throw new Error(
        `Author with ID "${question.authorId.toString()}" does not exist.`,
      );
    }

    const questionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(
        question.id.toString(),
      );

    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.items.find((item) => {
        return item.id.equals(questionAttachment.attachmentId);
      });

      if (!attachment) {
        throw new Error(
          `Attachment with ID "${questionAttachment.attachmentId.toString()}" does not exist.`,
        );
      }

      return Attachment.create({
        title: attachment.title,
        url: attachment.url,
      });
    });

    return QuestionDetails.create({
      title: question.title,
      content: question.content,
      slug: question.slug,
      authorId: author.id,
      author: author.name,
      bestAnswerId: question.bestAnswerId,
      attachments,
      questionId: question.id,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });
  }

  async delete(question: Question) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== question.id.toString(),
    );
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }

  async findById(questionId: string) {
    const question = this.items.find(
      (item) => item.id.toString() === questionId,
    );
    if (!question) {
      return null;
    }

    return question;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
