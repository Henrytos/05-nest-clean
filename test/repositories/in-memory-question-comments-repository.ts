import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { InMemoryStudentsRepository } from './in-memory-students-repository';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  items: QuestionComment[] = [];

  constructor(private studentRepositories: InMemoryStudentsRepository) {}

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toValue() == id);

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toValue() === questionComment.id.toValue(),
    );
    this.items.splice(itemIndex, 1);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionCommentsWithAuthor = this.items
      .filter((item) => item.questionId.equals(new UniqueEntityID(questionId)))
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

    return questionCommentsWithAuthor;
  }
}
