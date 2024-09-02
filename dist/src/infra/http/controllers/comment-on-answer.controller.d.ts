import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CommentOnAnswerBodyDto } from '../dto/comment-on-answer-body-dto';
export declare class CommentOnAnswerController {
    private commentOnAnswerUseCase;
    constructor(commentOnAnswerUseCase: CommentOnAnswerUseCase);
    handler(user: UserPayload, body: CommentOnAnswerBodyDto, answerId: string): Promise<void>;
}
