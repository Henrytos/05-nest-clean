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
exports.CommentOnAnswerController = void 0;
const comment_on_answer_1 = require("../../../domain/forum/application/use-cases/comment-on-answer");
const current_user_decorator_1 = require("../../auth/current-user-decorator");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const swagger_1 = require("@nestjs/swagger");
const comment_on_answer_body_dto_1 = require("../dto/comment-on-answer-body-dto");
const commentOnAnswerBodySchema = zod_1.z.object({
    content: zod_1.z.string(),
});
const commentOnAnswerValidatePipe = new zod_validation_pipe_1.ZodValidationPipe(commentOnAnswerBodySchema);
let CommentOnAnswerController = class CommentOnAnswerController {
    constructor(commentOnAnswerUseCase) {
        this.commentOnAnswerUseCase = commentOnAnswerUseCase;
    }
    async handler(user, body, answerId) {
        const { content } = body;
        const result = await this.commentOnAnswerUseCase.execute({
            answerId,
            authorId: user.sub,
            content,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.CommentOnAnswerController = CommentOnAnswerController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)('answer comments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Bearer',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: comment_on_answer_body_dto_1.CommentOnAnswerBodyDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(commentOnAnswerValidatePipe)),
    __param(2, (0, common_1.Param)('answerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_on_answer_body_dto_1.CommentOnAnswerBodyDto, String]),
    __metadata("design:returntype", Promise)
], CommentOnAnswerController.prototype, "handler", null);
exports.CommentOnAnswerController = CommentOnAnswerController = __decorate([
    (0, common_1.Controller)('/answers/:answerId/comments'),
    __metadata("design:paramtypes", [comment_on_answer_1.CommentOnAnswerUseCase])
], CommentOnAnswerController);
//# sourceMappingURL=comment-on-answer.controller.js.map