"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCommentWithAuthorMapper = void 0;
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const comment_with_author_1 = require("../../../../../domain/forum/enterprise/entities/value-objects/comment-with-author");
class PrismaCommentWithAuthorMapper {
    static toDomain(raw) {
        return comment_with_author_1.CommentWithAuthor.create({
            authorId: new unique_entity_id_1.UniqueEntityID(raw.author.id),
            author: raw.author.name,
            commentId: new unique_entity_id_1.UniqueEntityID(raw.id),
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? null,
        });
    }
}
exports.PrismaCommentWithAuthorMapper = PrismaCommentWithAuthorMapper;
//# sourceMappingURL=prisma-comment-with-author-mapper.js.map