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
exports.DeleteAnswerUseCase = void 0;
const answers_repository_1 = require("../repositories/answers-repository");
const either_1 = require("../../../../core/either");
const not_allowed_error_1 = require("../../../../core/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const common_1 = require("@nestjs/common");
let DeleteAnswerUseCase = class DeleteAnswerUseCase {
    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }
    async execute({ authorId, answerId, }) {
        const answer = await this.answerRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (!(answer.authorId.toString() === authorId)) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.answerRepository.delete(answer);
        return (0, either_1.right)({});
    }
};
exports.DeleteAnswerUseCase = DeleteAnswerUseCase;
exports.DeleteAnswerUseCase = DeleteAnswerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository])
], DeleteAnswerUseCase);
//# sourceMappingURL=delete-answer.js.map