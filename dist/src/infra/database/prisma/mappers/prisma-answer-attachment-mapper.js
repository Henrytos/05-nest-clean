"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnswerAttachmentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_attachment_1 = require("../../../../domain/forum/enterprise/entities/answer-attachment");
class PrismaAnswerAttachmentMapper {
    static toDomain(raw) {
        if (!raw.answerId) {
            throw new Error('AansweId is required');
        }
        return answer_attachment_1.AnswerAttachment.create({
            answerId: new unique_entity_id_1.UniqueEntityID(raw.answerId),
            attachmentId: new unique_entity_id_1.UniqueEntityID(raw.id),
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(attachment) {
        return {
            data: {
                answerId: attachment.answerId.toString(),
            },
            where: {
                id: attachment.id.toString(),
            },
        };
    }
    static toPrismaUpdateMany(attachments) {
        const attachmentsIds = attachments.map((attachment) => attachment.attachmentId.toString());
        return {
            where: {
                id: {
                    in: attachmentsIds,
                },
            },
            data: {
                answerId: attachments[0].answerId.toString(),
            },
        };
    }
}
exports.PrismaAnswerAttachmentMapper = PrismaAnswerAttachmentMapper;
//# sourceMappingURL=prisma-answer-attachment-mapper.js.map