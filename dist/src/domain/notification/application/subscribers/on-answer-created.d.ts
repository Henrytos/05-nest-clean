import { EventHandler } from '@/core/events/event-handler';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository';
import { SendNotificationUseCase } from '../use-cases/send-notification';
export declare class OnAnswerCreated implements EventHandler {
    private questionsRepository;
    private sendNotificationUseCase;
    constructor(questionsRepository: QuestionsRepository, sendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNewAnswerNotification;
}
