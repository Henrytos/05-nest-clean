"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionPresenter = void 0;
class QuestionPresenter {
    static toHTTP(question) {
        return {
            id: question.id.toValue(),
            bestAnswer: question.bestAnswerId?.toValue(),
            title: question.title,
            slug: question.slug.value,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        };
    }
}
exports.QuestionPresenter = QuestionPresenter;
//# sourceMappingURL=question-presenter.js.map