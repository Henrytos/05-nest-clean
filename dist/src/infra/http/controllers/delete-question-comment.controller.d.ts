import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
export declare class DeleteQuestionCommentController {
    private deleteQuestionComment;
    constructor(deleteQuestionComment: DeleteQuestionCommentUseCase);
    handler(user: UserPayload, questionCommentId: string): Promise<void>;
}
