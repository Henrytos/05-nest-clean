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
exports.FetchRecentQuestionsUseCase = void 0;
const either_1 = require("../../../../core/either");
const question_repository_1 = require("../repositories/question-repository");
const common_1 = require("@nestjs/common");
let FetchRecentQuestionsUseCase = class FetchRecentQuestionsUseCase {
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ page, }) {
        const questions = await this.questionsRepository.findManyRecent({ page });
        return (0, either_1.right)({
            questions,
        });
    }
};
exports.FetchRecentQuestionsUseCase = FetchRecentQuestionsUseCase;
exports.FetchRecentQuestionsUseCase = FetchRecentQuestionsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository])
], FetchRecentQuestionsUseCase);
//# sourceMappingURL=fetch-recent-questions.js.map