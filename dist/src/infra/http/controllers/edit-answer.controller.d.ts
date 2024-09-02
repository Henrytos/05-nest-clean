import { UserPayload } from '@/infra/auth/jwt.strategy';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { EditAnswerBodyDto } from '../dto/edit-answer-body-dto';
export declare class EditAnswerController {
    private editAnswerUseCase;
    constructor(editAnswerUseCase: EditAnswerUseCase);
    handler(body: EditAnswerBodyDto, user: UserPayload, answerId: string): Promise<void>;
}
