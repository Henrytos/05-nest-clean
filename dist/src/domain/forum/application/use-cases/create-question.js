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
exports.CreateQuestionUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_1 = require("../../enterprise/entities/question");
const question_repository_1 = require("../repositories/question-repository");
const either_1 = require("../../../../core/either");
const question_attachment_1 = require("../../enterprise/entities/question-attachment");
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
const common_1 = require("@nestjs/common");
let CreateQuestionUseCase = class CreateQuestionUseCase {
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ authorId, content, title, attachmentsIds, }) {
        const question = question_1.Question.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            content,
            title,
        });
        const questionAttachments = attachmentsIds.map((attachmentId) => {
            return question_attachment_1.QuestionAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                questionId: question.id,
            });
        });
        question.attachments = new question_attachment_list_1.QuestionAttachmentList(questionAttachments);
        await this.questionsRepository.create(question);
        return (0, either_1.right)({
            question,
        });
    }
};
exports.CreateQuestionUseCase = CreateQuestionUseCase;
exports.CreateQuestionUseCase = CreateQuestionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository])
], CreateQuestionUseCase);
//# sourceMappingURL=create-question.js.map