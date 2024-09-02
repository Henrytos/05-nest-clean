"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaNotificationMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const notification_1 = require("../../../../domain/notification/enterprise/entities/notification");
class PrismaNotificationMapper {
    static toDomain(raw) {
        return notification_1.Notification.create({
            content: raw.content,
            recipientId: new unique_entity_id_1.UniqueEntityID(raw.recipientId),
            title: raw.title,
            createdAt: new Date(raw.createdAt),
            readAt: raw.readAt ? new Date(raw.readAt) : null,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(notification) {
        return {
            id: notification.id.toString(),
            recipientId: notification.recipientId.toString(),
            content: notification.content,
            title: notification.title,
            createdAt: notification.createdAt,
            readAt: notification.readAt,
        };
    }
}
exports.PrismaNotificationMapper = PrismaNotificationMapper;
//# sourceMappingURL=prisma-notification-mapper.js.map