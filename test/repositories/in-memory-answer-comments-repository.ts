import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { InMemoryStudentsRepository } from './in-memory-students-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  items: AnswerComment[] = [];

  constructor(private studentRepositories: InMemoryStudentsRepository) {}

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toValue() == id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toValue() === answerComment.id.toValue(),
    );
    this.items.splice(itemIndex, 1);
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerCommentsWithAuthor = this.items
      .filter((item) => item.answerId.equals(new UniqueEntityID(answerId)))
      .map((comment) => {
        const author = this.studentRepositories.items.find((student) => {
          return student.id.equals(comment.authorId);
        });
        if (!author) {
          throw new Error('Author not found');
        }
        return CommentWithAuthor.create({
          authorId: author.id,
          author: author.name,
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        });
      })
      .slice((page - 1) * 20, page * 20);

    return answerCommentsWithAuthor;
  }
}
