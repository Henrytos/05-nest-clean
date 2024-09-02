"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQuestionAttachmentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_attachment_1 = require("../../../../domain/forum/enterprise/entities/question-attachment");
class PrismaQuestionAttachmentMapper {
    static toDomain(raw) {
        if (!raw.questionId) {
            throw new Error('AquestionId is required');
        }
        return question_attachment_1.QuestionAttachment.create({
            questionId: new unique_entity_id_1.UniqueEntityID(raw.questionId),
            attachmentId: new unique_entity_id_1.UniqueEntityID(raw.id),
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrismaUpdateMany(attachments) {
        const attachmentsIds = attachments.map((attachment) => {
            return attachment.attachmentId.toString();
        });
        return {
            where: {
                id: {
                    in: attachmentsIds,
                },
            },
            data: {
                questionId: attachments[0].questionId.toString(),
            },
        };
    }
}
exports.PrismaQuestionAttachmentMapper = PrismaQuestionAttachmentMapper;
//# sourceMappingURL=prisma-question-attachment-mapper.js.map