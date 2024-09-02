import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { Prisma, Notification as PrismaNotification } from '@prisma/client';
export declare class PrismaNotificationMapper {
    static toDomain(raw: PrismaNotification): Notification;
    static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput;
}
