import { Comment } from '@/domain/forum/enterprise/entities/comment';

export class CommentPresenter {
  static toHTTP(comment: Comment<any>) {
    return {
      id: comment.id.toValue(),
      content: comment.content,
      createdAt: comment.createdAt,
      updateAt: comment.updatedAt,
    };
  }
}
