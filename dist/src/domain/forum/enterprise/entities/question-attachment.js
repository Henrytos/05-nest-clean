"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAttachment = void 0;
const entity_1 = require("../../../../core/entities/entity");
class QuestionAttachment extends entity_1.Entity {
    get questionId() {
        return this.props.questionId;
    }
    get attachmentId() {
        return this.props.attachmentId;
    }
    static create(props, id) {
        const attachment = new QuestionAttachment(props, id);
        return attachment;
    }
}
exports.QuestionAttachment = QuestionAttachment;
//# sourceMappingURL=question-attachment.js.map