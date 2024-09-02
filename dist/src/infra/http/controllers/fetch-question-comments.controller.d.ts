import { z } from 'zod';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
declare const pageQueryParamSchema: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export declare class FetchQuestionCommentsController {
    private fetchQuestionCommentsUseCase;
    constructor(fetchQuestionCommentsUseCase: FetchQuestionCommentsUseCase);
    handler(page: PageQueryParamSchema, questionId: string): Promise<{
        comments: {
            commentId: string;
            authorId: string;
            authorName: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export {};
