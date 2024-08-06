import { Module } from '@nestjs/common';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';

import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateQuestionController } from './controllers/create-question.controller';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';


@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    FetchRecentQuestionsController,
    CreateQuestionController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase
  ]
})
export class HttpModule {}
