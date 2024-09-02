import { UserPayload } from '@/infra/auth/jwt.strategy';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { AnswerQuestionBodyDto } from '../dto/answer-question-body-dto';
export declare class AnswerQuestionController {
    private answerQuestionUseCase;
    constructor(answerQuestionUseCase: AnswerQuestionUseCase);
    handler(body: AnswerQuestionBodyDto, user: UserPayload, questionId: string): Promise<void>;
}
