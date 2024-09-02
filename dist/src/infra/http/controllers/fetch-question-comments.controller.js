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
exports.FetchQuestionCommentsController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const fetch_question_comments_1 = require("../../../domain/forum/application/use-cases/fetch-question-comments");
const comment_with_author_presenter_1 = require("../presenters/comment-with-author-presenter");
const swagger_1 = require("@nestjs/swagger");
const pageQueryParamSchema = zod_1.z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(zod_1.z.number().min(1));
const queryValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(pageQueryParamSchema);
let FetchQuestionCommentsController = class FetchQuestionCommentsController {
    constructor(fetchQuestionCommentsUseCase) {
        this.fetchQuestionCommentsUseCase = fetchQuestionCommentsUseCase;
    }
    async handler(page, questionId) {
        const result = await this.fetchQuestionCommentsUseCase.execute({
            page,
            questionId,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException();
        }
        const comments = result.value.comments;
        return {
            comments: comments.map(comment_with_author_presenter_1.CommentWithAuthorPresenter.toHTTP),
        };
    }
};
exports.FetchQuestionCommentsController = FetchQuestionCommentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)('question comments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Bearer',
        example: 'Bearer',
    }),
    (0, swagger_1.ApiParam)({ name: 'questionId', type: 'string' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page', queryValidationPipe)),
    __param(1, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FetchQuestionCommentsController.prototype, "handler", null);
exports.FetchQuestionCommentsController = FetchQuestionCommentsController = __decorate([
    (0, common_1.Controller)('/questions/:questionId/comments'),
    __metadata("design:paramtypes", [fetch_question_comments_1.FetchQuestionCommentsUseCase])
], FetchQuestionCommentsController);
//# sourceMappingURL=fetch-question-comments.controller.js.map