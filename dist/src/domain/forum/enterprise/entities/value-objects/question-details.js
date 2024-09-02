"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDetails = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class QuestionDetails extends value_object_1.ValueObject {
    get questionId() {
        return this.props.questionId;
    }
    get authorId() {
        return this.props.authorId;
    }
    get title() {
        return this.props.title;
    }
    get content() {
        return this.props.content;
    }
    get author() {
        return this.props.author;
    }
    get slug() {
        return this.props.slug;
    }
    get bestAnswerId() {
        return this.props.bestAnswerId;
    }
    get attachments() {
        return this.props.attachments;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    static create(questionDatails) {
        return new QuestionDetails(questionDatails);
    }
}
exports.QuestionDetails = QuestionDetails;
//# sourceMappingURL=question-details.js.map