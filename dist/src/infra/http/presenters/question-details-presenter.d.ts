import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
export declare class QuestionDetailsPresenter {
    static toHTTP(questionDetails: QuestionDetails): {
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
}
