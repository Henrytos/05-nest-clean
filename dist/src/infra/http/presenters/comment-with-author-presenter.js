"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentWithAuthorPresenter = void 0;
class CommentWithAuthorPresenter {
    static toHTTP(commentWithAuthor) {
        return {
            commentId: commentWithAuthor.commentId.toString(),
            authorId: commentWithAuthor.authorId.toString(),
            authorName: commentWithAuthor.author,
            content: commentWithAuthor.content,
            createdAt: commentWithAuthor.createdAt,
            updatedAt: commentWithAuthor.updatedAt,
        };
    }
}
exports.CommentWithAuthorPresenter = CommentWithAuthorPresenter;
//# sourceMappingURL=comment-with-author-presenter.js.map