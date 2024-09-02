import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
export declare class OnQuestionBestAnswerChosen implements EventHandler {
    private answerRepository;
    private sendNotificationUseCase;
    constructor(answerRepository: AnswersRepository, sendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendQuestionBestAnswerNotification;
}
