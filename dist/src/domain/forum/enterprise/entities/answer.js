"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const answer_attachment_list_1 = require("./answer-attachment-list");
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
const answer_created_event_1 = require("../events/answer-created-event");
class Answer extends aggregate_root_1.AggregateRoot {
    get authorId() {
        return this.props.authorId;
    }
    get questionId() {
        return this.props.questionId;
    }
    get content() {
        return this.props.content;
    }
    get attachments() {
        return this.props.attachments;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    set content(content) {
        this.props.content = content;
        this.touch;
    }
    set attachments(attachments) {
        this.props.attachments = attachments;
    }
    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('....');
    }
    static create(props, id) {
        const answer = new Answer({
            attachments: props.attachments ?? new answer_attachment_list_1.AnswerAttachmentList(),
            createdAt: props.createdAt ?? new Date(),
            ...props,
        }, id);
        const isNewAnswer = !id;
        if (isNewAnswer) {
            answer.addDomainEvent(new answer_created_event_1.AnswerCreatedEvent(answer));
        }
        return answer;
    }
}
exports.Answer = Answer;
//# sourceMappingURL=answer.js.map