"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerComment = void 0;
const comment_1 = require("./comment");
class AnswerComment extends comment_1.Comment {
    get answerId() {
        return this.props.answerId;
    }
    static create(props, id) {
        const answerComment = new AnswerComment({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return answerComment;
    }
}
exports.AnswerComment = AnswerComment;
//# sourceMappingURL=answer-comment.js.map