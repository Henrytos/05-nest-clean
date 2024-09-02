import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';
export declare class DeleteAnswerController {
    private deleteAnswerUseCase;
    constructor(deleteAnswerUseCase: DeleteAnswerUseCase);
    handler(user: UserPayload, answerId: string): Promise<void>;
}
