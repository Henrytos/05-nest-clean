import { UserPayload } from '@/infra/auth/jwt.strategy';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { EditQuestionBodyDto } from '../dto/edit-question-body-dto';
export declare class EditQuestionController {
    private editQuestionUseCase;
    constructor(editQuestionUseCase: EditQuestionUseCase);
    handler(body: EditQuestionBodyDto, user: UserPayload, questionId: string): Promise<void>;
}
