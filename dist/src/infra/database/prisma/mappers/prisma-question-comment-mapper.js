"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQuestionCommentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_comment_1 = require("../../../../domain/forum/enterprise/entities/question-comment");
class PrismaQuestionCommentMapper {
    static toDomain(raw) {
        if (!raw.questionId) {
            throw new Error('QuestionId is required');
        }
        return question_comment_1.QuestionComment.create({
            questionId: new unique_entity_id_1.UniqueEntityID(raw.answerId),
            authorId: new unique_entity_id_1.UniqueEntityID(raw.authorId),
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(questioncomment) {
        return {
            id: questioncomment.id.toString(),
            questionId: questioncomment.questionId.toString(),
            authorId: questioncomment.authorId.toString(),
            content: questioncomment.content,
            createdAt: questioncomment.createdAt,
            updatedAt: questioncomment.updatedAt,
        };
    }
}
exports.PrismaQuestionCommentMapper = PrismaQuestionCommentMapper;
//# sourceMappingURL=prisma-question-comment-mapper.js.map