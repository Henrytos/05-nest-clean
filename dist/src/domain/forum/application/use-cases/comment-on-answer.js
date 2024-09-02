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
exports.CommentOnAnswerUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_comments_repository_1 = require("../repositories/answer-comments-repository");
const answer_comment_1 = require("../../enterprise/entities/answer-comment");
const answers_repository_1 = require("../repositories/answers-repository");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const common_1 = require("@nestjs/common");
let CommentOnAnswerUseCase = class CommentOnAnswerUseCase {
    constructor(answersRepository, answerCommentsRepository) {
        this.answersRepository = answersRepository;
        this.answerCommentsRepository = answerCommentsRepository;
    }
    async execute({ authorId, answerId, content, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const answerComment = answer_comment_1.AnswerComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            answerId: new unique_entity_id_1.UniqueEntityID(answerId),
            content,
        });
        await this.answerCommentsRepository.create(answerComment);
        return (0, either_1.right)({
            answerComment,
        });
    }
};
exports.CommentOnAnswerUseCase = CommentOnAnswerUseCase;
exports.CommentOnAnswerUseCase = CommentOnAnswerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository,
        answer_comments_repository_1.AnswerCommentsRepository])
], CommentOnAnswerUseCase);
//# sourceMappingURL=comment-on-answer.js.map