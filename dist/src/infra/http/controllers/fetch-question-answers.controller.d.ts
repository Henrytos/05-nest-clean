import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { z } from 'zod';
declare const pageQueryParamSchema: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export declare class FetchQuestionAnswersController {
    private fetchQuestionAnswers;
    constructor(fetchQuestionAnswers: FetchQuestionAnswersUseCase);
    handle(page: PageQueryParamSchema, questionId: string): Promise<{
        answers: {
            content: string;
            attachments: any[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export {};
