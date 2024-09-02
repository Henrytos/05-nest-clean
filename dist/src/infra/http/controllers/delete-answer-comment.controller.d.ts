import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
export declare class DeleteAnswerCommentController {
    private deleteAnswerComment;
    constructor(deleteAnswerComment: DeleteAnswerCommentUseCase);
    handler(user: UserPayload, answerCommentId: string): Promise<void>;
}
