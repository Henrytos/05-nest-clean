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
exports.AnswerQuestionController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../auth/current-user-decorator");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const zod_1 = require("zod");
const answer_question_1 = require("../../../domain/forum/application/use-cases/answer-question");
const swagger_1 = require("@nestjs/swagger");
const answer_question_body_dto_1 = require("../dto/answer-question-body-dto");
const answerQuestionBodySchema = zod_1.z.object({
    content: zod_1.z.string(),
    attachments: zod_1.z.array(zod_1.z.string().uuid()),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(answerQuestionBodySchema);
let AnswerQuestionController = class AnswerQuestionController {
    constructor(answerQuestionUseCase) {
        this.answerQuestionUseCase = answerQuestionUseCase;
    }
    async handler(body, user, questionId) {
        const { content, attachments } = body;
        const result = await this.answerQuestionUseCase.execute({
            authorId: user.sub,
            attachmentsIds: attachments,
            content,
            questionId,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AnswerQuestionController = AnswerQuestionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)('answers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Bearer',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: answer_question_body_dto_1.AnswerQuestionBodyDto }),
    (0, swagger_1.ApiParam)({ name: 'questionId', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Bad request' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_question_body_dto_1.AnswerQuestionBodyDto, Object, String]),
    __metadata("design:returntype", Promise)
], AnswerQuestionController.prototype, "handler", null);
exports.AnswerQuestionController = AnswerQuestionController = __decorate([
    (0, common_1.Controller)('/questions/:questionId/answer'),
    __metadata("design:paramtypes", [answer_question_1.AnswerQuestionUseCase])
], AnswerQuestionController);
//# sourceMappingURL=answer-question.controller.js.map