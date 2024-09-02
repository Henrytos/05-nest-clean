"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const slug_1 = require("./value-objects/slug");
const dayjs_1 = require("dayjs");
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
const question_attachment_list_1 = require("./question-attachment-list");
const question_best_answer_chosen_event_1 = require("../events/question-best-answer-chosen-event");
class Question extends aggregate_root_1.AggregateRoot {
    get authorId() {
        return this.props.authorId;
    }
    get bestAnswerId() {
        return this.props.bestAnswerId;
    }
    get content() {
        return this.props.content;
    }
    get slug() {
        return this.props.slug;
    }
    get title() {
        return this.props.title;
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
    get isNew() {
        return (0, dayjs_1.default)().diff(this.props.createdAt, 'days') <= 3;
    }
    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('....');
    }
    set content(content) {
        this.props.content = content;
        this.touch();
    }
    set title(title) {
        this.props.title = title;
        this.props.slug = slug_1.Slug.createFromText(title);
        this.touch();
    }
    get attachments() {
        return this.props.attachments;
    }
    set attachments(attachments) {
        this.props.attachments = attachments;
    }
    set bestAnswerId(bestAnswerId) {
        if (!bestAnswerId) {
            return;
        }
        if (this.props.bestAnswerId?.equals(bestAnswerId)) {
            return;
        }
        this.addDomainEvent(new question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent(this, bestAnswerId));
        this.props.bestAnswerId = bestAnswerId;
        this.touch();
    }
    static create(props, id) {
        const question = new Question({
            attachments: props.attachments ?? new question_attachment_list_1.QuestionAttachmentList(),
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
            createdAt: props.createdAt ?? new Date(),
            ...props,
        }, id);
        return question;
    }
}
exports.Question = Question;
//# sourceMappingURL=question.js.map