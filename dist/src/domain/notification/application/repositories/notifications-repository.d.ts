import { Notification } from '../../enterprise/entities/notification';
export declare abstract class NotificationsRepository {
    abstract findById(notificationId: string): Promise<Notification | null>;
    abstract save(notification: Notification): Promise<void>;
    abstract create(notification: Notification): Promise<void>;
}
