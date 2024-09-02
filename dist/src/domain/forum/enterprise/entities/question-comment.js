"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionComment = void 0;
const comment_1 = require("./comment");
class QuestionComment extends comment_1.Comment {
    get questionId() {
        return this.props.questionId;
    }
    static create(props, id) {
        const questionComment = new QuestionComment({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return questionComment;
    }
}
exports.QuestionComment = QuestionComment;
//# sourceMappingURL=question-comment.js.map