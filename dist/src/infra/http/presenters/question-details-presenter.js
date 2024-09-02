"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDetailsPresenter = void 0;
const attachment_presenter_1 = require("./attachment-presenter");
class QuestionDetailsPresenter {
    static toHTTP(questionDetails) {
        return {
            questionId: questionDetails.questionId.toString(),
            authorId: questionDetails.authorId.toString(),
            author: questionDetails.author,
            title: questionDetails.title,
            content: questionDetails.content,
            slug: questionDetails.slug.value,
            bestAnswerId: questionDetails.bestAnswerId?.toString(),
            attachments: questionDetails.attachments.map(attachment_presenter_1.AttachmentPresenter.toHTTP),
            createdAt: questionDetails.createdAt,
            updatedAt: questionDetails.updatedAt,
        };
    }
}
exports.QuestionDetailsPresenter = QuestionDetailsPresenter;
//# sourceMappingURL=question-details-presenter.js.map