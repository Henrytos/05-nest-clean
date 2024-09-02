"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentWithAuthor = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class CommentWithAuthor extends value_object_1.ValueObject {
    get commentId() {
        return this.props.commentId;
    }
    get content() {
        return this.props.content;
    }
    get authorId() {
        return this.props.authorId;
    }
    get author() {
        return this.props.author;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    static create(props) {
        return new CommentWithAuthor(props);
    }
}
exports.CommentWithAuthor = CommentWithAuthor;
//# sourceMappingURL=comment-with-author.js.map