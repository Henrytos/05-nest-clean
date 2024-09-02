"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQuestionMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_1 = require("../../../../domain/forum/enterprise/entities/question");
const slug_1 = require("../../../../domain/forum/enterprise/entities/value-objects/slug");
class PrismaQuestionMapper {
    static toDomain(raw) {
        return question_1.Question.create({
            title: raw.title,
            content: raw.content,
            authorId: new unique_entity_id_1.UniqueEntityID(raw.authorId),
            bestAnswerId: raw.bestAnswerId
                ? new unique_entity_id_1.UniqueEntityID(raw.bestAnswerId)
                : null,
            slug: slug_1.Slug.create(raw.slug),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(question) {
        return {
            id: question.id.toString(),
            authorId: question.authorId.toString(),
            bestAnswerId: question.bestAnswerId?.toString(),
            title: question.title,
            content: question.content,
            slug: question.slug.value,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        };
    }
}
exports.PrismaQuestionMapper = PrismaQuestionMapper;
//# sourceMappingURL=prisma-question-mapper.js.map