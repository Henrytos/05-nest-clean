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
exports.FetchQuestionAnswersUseCase = void 0;
const either_1 = require("../../../../core/either");
const answers_repository_1 = require("../repositories/answers-repository");
const common_1 = require("@nestjs/common");
let FetchQuestionAnswersUseCase = class FetchQuestionAnswersUseCase {
    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }
    async execute({ questionId, page, }) {
        const answers = await this.answerRepository.findManyByQuestionId(questionId, { page });
        return (0, either_1.right)({
            answers,
        });
    }
};
exports.FetchQuestionAnswersUseCase = FetchQuestionAnswersUseCase;
exports.FetchQuestionAnswersUseCase = FetchQuestionAnswersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository])
], FetchQuestionAnswersUseCase);
//# sourceMappingURL=fetch-question-answers.js.map