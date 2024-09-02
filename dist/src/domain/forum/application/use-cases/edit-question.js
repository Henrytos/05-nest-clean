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
exports.EditQuestionUseCase = void 0;
const either_1 = require("../../../../core/either");
const question_repository_1 = require("../repositories/question-repository");
const not_allowed_error_1 = require("../../../../core/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/errors/resource-not-found-error");
const question_attachments_repository_1 = require("../repositories/question-attachments-repository");
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
const question_attachment_1 = require("../../enterprise/entities/question-attachment");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const common_1 = require("@nestjs/common");
let EditQuestionUseCase = class EditQuestionUseCase {
    constructor(questionsRepository, questionAttachmentsRepository) {
        this.questionsRepository = questionsRepository;
        this.questionAttachmentsRepository = questionAttachmentsRepository;
    }
    async execute({ authorId, questionId, content, title, attachmentsIds, }) {
        const question = await this.questionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (!(question.authorId.toValue() === authorId)) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId);
        const questionAttachmentList = new question_attachment_list_1.QuestionAttachmentList(currentQuestionAttachments);
        const questionAttachments = attachmentsIds.map((attachmentsId) => {
            return question_attachment_1.QuestionAttachment.create({
                questionId: question.id,
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentsId),
            });
        });
        questionAttachmentList.update(questionAttachments);
        question.title = title;
        question.content = content;
        question.attachments = questionAttachmentList;
        await this.questionsRepository.save(question);
        return (0, either_1.right)({});
    }
};
exports.EditQuestionUseCase = EditQuestionUseCase;
exports.EditQuestionUseCase = EditQuestionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository,
        question_attachments_repository_1.QuestionAttachmentsRepository])
], EditQuestionUseCase);
//# sourceMappingURL=edit-question.js.map