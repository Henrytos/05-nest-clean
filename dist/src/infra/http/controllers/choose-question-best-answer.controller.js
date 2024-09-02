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
exports.ChooseQuestionBestAnswerController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../auth/current-user-decorator");
const choose_question_best_answer_1 = require("../../../domain/forum/application/use-cases/choose-question-best-answer");
const swagger_1 = require("@nestjs/swagger");
let ChooseQuestionBestAnswerController = class ChooseQuestionBestAnswerController {
    constructor(chooseQuestionBestAnswer) {
        this.chooseQuestionBestAnswer = chooseQuestionBestAnswer;
    }
    async handler(user, answerId) {
        const result = await this.chooseQuestionBestAnswer.execute({
            answerId,
            authorId: user.sub,
        });
        if (result.isLeft()) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.ChooseQuestionBestAnswerController = ChooseQuestionBestAnswerController;
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiTags)('answers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Auhtoriztion Bearer',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'answerId',
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
    __param(1, (0, common_1.Param)('answerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChooseQuestionBestAnswerController.prototype, "handler", null);
exports.ChooseQuestionBestAnswerController = ChooseQuestionBestAnswerController = __decorate([
    (0, common_1.Controller)('/answers/:answerId/choose-as-best'),
    __metadata("design:paramtypes", [choose_question_best_answer_1.ChooseQuestionBestAnswerUseCase])
], ChooseQuestionBestAnswerController);
//# sourceMappingURL=choose-question-best-answer.controller.js.map