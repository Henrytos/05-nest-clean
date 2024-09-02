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
exports.DeleteAnswerCommentController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../auth/current-user-decorator");
const delete_answer_comment_1 = require("../../../domain/forum/application/use-cases/delete-answer-comment");
const swagger_1 = require("@nestjs/swagger");
let DeleteAnswerCommentController = class DeleteAnswerCommentController {
    constructor(deleteAnswerComment) {
        this.deleteAnswerComment = deleteAnswerComment;
    }
    async handler(user, answerCommentId) {
        const result = await this.deleteAnswerComment.execute({
            authorId: user.sub,
            answerCommentId,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.DeleteAnswerCommentController = DeleteAnswerCommentController;
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiTags)('answer comments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Bearer',
        example: 'Bearer ',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeleteAnswerCommentController.prototype, "handler", null);
exports.DeleteAnswerCommentController = DeleteAnswerCommentController = __decorate([
    (0, common_1.Controller)('/answers/comments/:id'),
    __metadata("design:paramtypes", [delete_answer_comment_1.DeleteAnswerCommentUseCase])
], DeleteAnswerCommentController);
//# sourceMappingURL=delete-answer-comment.controller.js.map