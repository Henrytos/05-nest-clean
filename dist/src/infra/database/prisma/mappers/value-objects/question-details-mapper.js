"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQuestionDetailsMapper = void 0;
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const prisma_attachment_mapper_1 = require("../prisma-attachment-mapper");
const question_details_1 = require("../../../../../domain/forum/enterprise/entities/value-objects/question-details");
const slug_1 = require("../../../../../domain/forum/enterprise/entities/value-objects/slug");
class PrismaQuestionDetailsMapper {
    static toDomain(raw) {
        return question_details_1.QuestionDetails.create({
            questionId: new unique_entity_id_1.UniqueEntityID(raw.id),
            authorId: new unique_entity_id_1.UniqueEntityID(raw.author.id),
            author: raw.author.name,
            title: raw.title,
            slug: slug_1.Slug.create(raw.slug),
            attachments: raw.attachments.map(prisma_attachment_mapper_1.PrismaAttachmentMapper.toDomain),
            bestAnswerId: raw.bestAnswerId
                ? new unique_entity_id_1.UniqueEntityID(raw.bestAnswerId)
                : null,
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}
exports.PrismaQuestionDetailsMapper = PrismaQuestionDetailsMapper;
//# sourceMappingURL=question-details-mapper.js.map