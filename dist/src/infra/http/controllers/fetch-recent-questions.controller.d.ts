import { z } from 'zod';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';
declare const pageQueryParamSchema: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export declare class FetchRecentQuestionsController {
    private fetchRecentQuestionsUseCase;
    constructor(fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase);
    handler(page: PageQueryParamSchema): Promise<{
        questions: {
            id: string;
            bestAnswer: string;
            title: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export {};
