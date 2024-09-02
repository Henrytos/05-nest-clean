import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ReadNotificationController {
    private readNotification;
    constructor(readNotification: ReadNotificationUseCase);
    handler(notificationId: string, user: UserPayload): Promise<void>;
}
