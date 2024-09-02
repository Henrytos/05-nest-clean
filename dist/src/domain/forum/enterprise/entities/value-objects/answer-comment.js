"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerComment = void 0;
const entity_1 = require("../../../../../core/entities/entity");
class AnswerComment extends entity_1.Entity {
    get authorId() {
        return this.props.authorId;
    }
    get content() {
        return this.props.content;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    set content(content) {
        this.props.content = content;
        this.touch();
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