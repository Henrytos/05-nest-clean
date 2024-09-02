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
exports.CommentOnQuestionUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_repository_1 = require("../repositories/question-repository");
const question_comments_repository_1 = require("../repositories/question-comments-repository");
const question_comment_1 = require("../../enterprise/entities/question-comment");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const common_1 = require("@nestjs/common");
let CommentOnQuestionUseCase = class CommentOnQuestionUseCase {
    constructor(questionsRepository, questionCommentsRepository) {
        this.questionsRepository = questionsRepository;
        this.questionCommentsRepository = questionCommentsRepository;
    }
    async execute({ authorId, questionId, content, }) {
        const question = await this.questionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const questionComment = question_comment_1.QuestionComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            questionId: new unique_entity_id_1.UniqueEntityID(questionId),
            content,
        });
        await this.questionCommentsRepository.create(questionComment);
        return (0, either_1.right)({
            questionComment,
        });
    }
};
exports.CommentOnQuestionUseCase = CommentOnQuestionUseCase;
exports.CommentOnQuestionUseCase = CommentOnQuestionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository,
        question_comments_repository_1.QuestionCommentsRepository])
], CommentOnQuestionUseCase);
//# sourceMappingURL=comment-on-question.js.map