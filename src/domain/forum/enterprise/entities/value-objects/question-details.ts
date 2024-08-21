import { ValueObject } from '@/core/entities/value-object';
import { Slug } from './slug';
import { Attachment } from '../attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface QuestionDetailsProps {
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  title: string;
  content: string;
  author: string;
  bestAnswerId?: UniqueEntityID;
  slug: Slug;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get author() {
    return this.props.author;
  }

  get slug() {
    return this.props.slug;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(questionDatails: QuestionDetailsProps) {
    return new QuestionDetails(questionDatails);
  }
}
