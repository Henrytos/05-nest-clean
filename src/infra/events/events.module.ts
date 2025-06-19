import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created';
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification';

@Module({
  imports: [DatabaseModule],
  providers: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    OnQuestionBestAnswerChosen,
    OnAnswerCreated,
  ],
})
export class EventsModule {}
