"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnswerCommentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_comment_1 = require("../../../../domain/forum/enterprise/entities/answer-comment");
class PrismaAnswerCommentMapper {
    static toDomain(raw) {
        if (!raw.answerId) {
            throw new Error('AansweId is required');
        }
        return answer_comment_1.AnswerComment.create({
            answerId: new unique_entity_id_1.UniqueEntityID(raw.answerId),
            authorId: new unique_entity_id_1.UniqueEntityID(raw.authorId),
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(answercomment) {
        return {
            id: answercomment.id.toString(),
            answerId: answercomment.answerId.toString(),
            authorId: answercomment.authorId.toString(),
            content: answercomment.content,
            createdAt: answercomment.createdAt,
            updatedAt: answercomment.updatedAt,
        };
    }
}
exports.PrismaAnswerCommentMapper = PrismaAnswerCommentMapper;
//# sourceMappingURL=prisma-answer-comment-mapper.js.map