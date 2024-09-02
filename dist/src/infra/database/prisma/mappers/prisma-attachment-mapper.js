"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAttachmentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const attachment_1 = require("../../../../domain/forum/enterprise/entities/attachment");
class PrismaAttachmentMapper {
    static toDomain(raw) {
        return attachment_1.Attachment.create({
            title: raw.title,
            url: raw.url,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(attachment) {
        return {
            id: attachment.id.toString(),
            title: attachment.title,
            url: attachment.url,
        };
    }
}
exports.PrismaAttachmentMapper = PrismaAttachmentMapper;
//# sourceMappingURL=prisma-attachment-mapper.js.map