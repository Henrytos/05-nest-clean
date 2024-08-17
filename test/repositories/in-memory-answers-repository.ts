import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.items.push(answer);
    this.answerAttachmentsRepository.createMany(answer.attachments.getItems());
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== answer.id.toString(),
    );
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async findById(answerId: string) {
    const answer = this.items.find((item) => item.id.toString() === answerId);

    if (!answer) {
      return null;
    }

    return answer;
  }
  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );
    this.items[itemIndex] = answer;

    this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(),
    );

    this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    );

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findManyByQuestionId(answerId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}
