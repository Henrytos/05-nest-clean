import { Either } from '@/core/either';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Notification } from '../../enterprise/entities/notification';
interface ReadNotificationUseCaseRequest {
    recipientId: string;
    notificationId: string;
}
type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase {
    private notificationsRepository;
    constructor(notificationsRepository: NotificationsRepository);
    execute({ recipientId, notificationId, }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse>;
}
export {};
