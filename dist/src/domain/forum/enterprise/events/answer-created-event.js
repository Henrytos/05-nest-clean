"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerCreatedEvent = void 0;
class AnswerCreatedEvent {
    constructor(answer) {
        this.answer = answer;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.answer.id;
    }
}
exports.AnswerCreatedEvent = AnswerCreatedEvent;
//# sourceMappingURL=answer-created-event.js.map