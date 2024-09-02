"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBestAnswerChosenEvent = void 0;
class QuestionBestAnswerChosenEvent {
    constructor(question, bestAnswerId) {
        this.question = question;
        this.bestAnswerId = bestAnswerId;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.question.id;
    }
}
exports.QuestionBestAnswerChosenEvent = QuestionBestAnswerChosenEvent;
//# sourceMappingURL=question-best-answer-chosen-event.js.map