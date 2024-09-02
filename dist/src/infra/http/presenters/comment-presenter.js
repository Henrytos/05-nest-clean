"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPresenter = void 0;
class CommentPresenter {
    static toHTTP(comment) {
        return {
            id: comment.id.toValue(),
            content: comment.content,
            createdAt: comment.createdAt,
            updateAt: comment.updatedAt,
        };
    }
}
exports.CommentPresenter = CommentPresenter;
//# sourceMappingURL=comment-presenter.js.map