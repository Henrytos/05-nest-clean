import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
export declare class DeleteQuestionController {
    private deleteQuestionUseCase;
    constructor(deleteQuestionUseCase: DeleteQuestionUseCase);
    handler(user: UserPayload, questionId: string): Promise<void>;
}
