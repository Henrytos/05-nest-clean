import { z } from 'zod';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
declare const pageQueryParamSchema: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export declare class FetchAnswerCommentsController {
    private fetchAnswerCommentsUseCase;
    constructor(fetchAnswerCommentsUseCase: FetchAnswerCommentsUseCase);
    handler(page: PageQueryParamSchema, answerId: string): Promise<{
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
