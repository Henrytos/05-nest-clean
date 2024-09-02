import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
declare const commentOnQuestionBodySchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content?: string;
}, {
    content?: string;
}>;
type CommentOnQuestionBody = z.infer<typeof commentOnQuestionBodySchema>;
export declare class CommentOnQuestionController {
    private commentOnQuestionUseCase;
    constructor(commentOnQuestionUseCase: CommentOnQuestionUseCase);
    handler(user: UserPayload, body: CommentOnQuestionBody, questionId: string): Promise<void>;
}
export {};
