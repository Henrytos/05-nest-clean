import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
export declare class PrismaNotificationsRepository implements NotificationsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(notificationId: string): Promise<Notification | null>;
    save(notification: Notification): Promise<void>;
    create(notification: Notification): Promise<void>;
}
