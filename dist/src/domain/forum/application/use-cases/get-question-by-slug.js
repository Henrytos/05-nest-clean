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
exports.GetQuestionBySlugUseCase = void 0;
const either_1 = require("../../../../core/either");
const question_repository_1 = require("../repositories/question-repository");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const common_1 = require("@nestjs/common");
let GetQuestionBySlugUseCase = class GetQuestionBySlugUseCase {
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ slug, }) {
        const question = await this.questionsRepository.findDetailsBySlug(slug);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.right)({
            question,
        });
    }
};
exports.GetQuestionBySlugUseCase = GetQuestionBySlugUseCase;
exports.GetQuestionBySlugUseCase = GetQuestionBySlugUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository])
], GetQuestionBySlugUseCase);
//# sourceMappingURL=get-question-by-slug.js.map