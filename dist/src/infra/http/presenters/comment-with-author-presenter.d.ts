import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
export declare class CommentWithAuthorPresenter {
    static toHTTP(commentWithAuthor: CommentWithAuthor): {
        commentId: string;
        authorId: string;
        authorName: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
