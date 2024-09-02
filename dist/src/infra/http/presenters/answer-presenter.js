"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerPresenter = void 0;
class AnswerPresenter {
    static toHTTP(answer) {
        return {
            content: answer.content,
            attachments: [],
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
        };
    }
}
exports.AnswerPresenter = AnswerPresenter;
//# sourceMappingURL=answer-presenter.js.map