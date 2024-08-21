import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { Comment as Prismacomment, User } from '@prisma/client';

type PrismaCommentWithAuthor = {
  author: User;
} & Prismacomment;

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    return CommentWithAuthor.create({
      authorId: new UniqueEntityID(raw.author.id),
      author: raw.author.name,
      commentId: new UniqueEntityID(raw.id),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? null,
    });
  }
}
