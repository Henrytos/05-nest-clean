"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerAttachment = void 0;
const entity_1 = require("../../../../core/entities/entity");
class AnswerAttachment extends entity_1.Entity {
    get answerId() {
        return this.props.answerId;
    }
    get attachmentId() {
        return this.props.attachmentId;
    }
    static create(props, id) {
        const attachment = new AnswerAttachment(props, id);
        return attachment;
    }
}
exports.AnswerAttachment = AnswerAttachment;
//# sourceMappingURL=answer-attachment.js.map