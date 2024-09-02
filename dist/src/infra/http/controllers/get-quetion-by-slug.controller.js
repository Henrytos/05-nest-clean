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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetQuestionBySlugController = void 0;
const common_1 = require("@nestjs/common");
const get_question_by_slug_1 = require("../../../domain/forum/application/use-cases/get-question-by-slug");
const question_details_presenter_1 = require("../presenters/question-details-presenter");
const swagger_1 = require("@nestjs/swagger");
let GetQuestionBySlugController = class GetQuestionBySlugController {
    constructor(getQuestionBySlugUseCase) {
        this.getQuestionBySlugUseCase = getQuestionBySlugUseCase;
    }
    async handler(slug) {
        const result = await this.getQuestionBySlugUseCase.execute({
            slug,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException();
        }
        return { question: question_details_presenter_1.QuestionDetailsPresenter.toHTTP(result.value.question) };
    }
};
exports.GetQuestionBySlugController = GetQuestionBySlugController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)('questions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Barer',
        example: 'Bearer',
    }),
    (0, swagger_1.ApiParam)({
        name: 'slug',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'bad request',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetQuestionBySlugController.prototype, "handler", null);
exports.GetQuestionBySlugController = GetQuestionBySlugController = __decorate([
    (0, common_1.Controller)('/questions/:slug'),
    __metadata("design:paramtypes", [get_question_by_slug_1.GetQuestionBySlugUseCase])
], GetQuestionBySlugController);
//# sourceMappingURL=get-quetion-by-slug.controller.js.map