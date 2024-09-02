import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';
export declare class ChooseQuestionBestAnswerController {
    private chooseQuestionBestAnswer;
    constructor(chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase);
    handler(user: UserPayload, answerId: string): Promise<void>;
}
