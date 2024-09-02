import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { Comment as Prismacomment, User } from '@prisma/client';
type PrismaCommentWithAuthor = {
    author: User;
} & Prismacomment;
export declare class PrismaCommentWithAuthorMapper {
    static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor;
}
export {};
