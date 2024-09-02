import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
export interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}
export type SendNotificationUseCaseResponse = Either<null, {
    notification: Notification;
}>;
export declare class SendNotificationUseCase {
    private notificationsRepository;
    constructor(notificationsRepository: NotificationsRepository);
    execute({ recipientId, content, title, }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse>;
}
