import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { CreateQuestionBodyDto } from '../dto/create-question-body-dto';
export declare class CreateQuestionController {
    private createQuestionUseCase;
    constructor(createQuestionUseCase: CreateQuestionUseCase);
    handler(body: CreateQuestionBodyDto, user: UserPayload): Promise<void>;
}
