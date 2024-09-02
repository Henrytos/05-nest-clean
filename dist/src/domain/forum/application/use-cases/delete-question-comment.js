"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionCommentUseCase = void 0;
const either_1 = require("../../../../core/either");
const question_comments_repository_1 = require("../repositories/question-comments-repository");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/not-allowed-error");
const common_1 = require("@nestjs/common");
let DeleteQuestionCommentUseCase = class DeleteQuestionCommentUseCase {
    constructor(questionCommentsRepository) {
        this.questionCommentsRepository = questionCommentsRepository;
    }
    async execute({ authorId, questionCommentId, }) {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);
        if (!questionComment) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (!(questionComment?.authorId.toValue() == authorId)) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.questionCommentsRepository.delete(questionComment);
        return (0, either_1.right)({});
    }
};
exports.DeleteQuestionCommentUseCase = DeleteQuestionCommentUseCase;
exports.DeleteQuestionCommentUseCase = DeleteQuestionCommentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_comments_repository_1.QuestionCommentsRepository])
], DeleteQuestionCommentUseCase);
//# sourceMappingURL=delete-question-comment.js.map