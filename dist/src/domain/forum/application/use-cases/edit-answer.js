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
exports.EditAnswerUseCase = void 0;
const either_1 = require("../../../../core/either");
const answers_repository_1 = require("../repositories/answers-repository");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/not-allowed-error");
const answer_attachment_1 = require("../../enterprise/entities/answer-attachment");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_attachment_list_1 = require("../../enterprise/entities/answer-attachment-list");
const answer_attachments_repository_1 = require("../repositories/answer-attachments-repository");
const common_1 = require("@nestjs/common");
let EditAnswerUseCase = class EditAnswerUseCase {
    constructor(answersRepository, answerAttachmentsRepository) {
        this.answersRepository = answersRepository;
        this.answerAttachmentsRepository = answerAttachmentsRepository;
    }
    async execute({ authorId, answerId, content, attachmentsIds, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (!(answer.authorId.toValue() === authorId)) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answer.id.toString());
        const answerAttachmentList = new answer_attachment_list_1.AnswerAttachmentList(currentAnswerAttachments);
        const answerAttachments = attachmentsIds.map((attachmentsId) => {
            return answer_attachment_1.AnswerAttachment.create({
                answerId: answer.id,
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentsId),
            });
        });
        answerAttachmentList.update(answerAttachments);
        answer.content = content;
        answer.attachments = answerAttachmentList;
        await this.answersRepository.save(answer);
        return (0, either_1.right)({
            answer,
        });
    }
};
exports.EditAnswerUseCase = EditAnswerUseCase;
exports.EditAnswerUseCase = EditAnswerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository,
        answer_attachments_repository_1.AnswerAttachmentsRepository])
], EditAnswerUseCase);
//# sourceMappingURL=edit-answer.js.map