import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
export declare class GetQuestionBySlugController {
    private getQuestionBySlugUseCase;
    constructor(getQuestionBySlugUseCase: GetQuestionBySlugUseCase);
    handler(slug: string): Promise<{
        question: {
            questionId: string;
            authorId: string;
            author: string;
            title: string;
            content: string;
            slug: string;
            bestAnswerId: string;
            attachments: {
                id: string;
                title: string;
                url: string;
            }[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
