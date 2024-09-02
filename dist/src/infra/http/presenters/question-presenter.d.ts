import { Question } from '@/domain/forum/enterprise/entities/question';
export declare class QuestionPresenter {
    static toHTTP(question: Question): {
        id: string;
        bestAnswer: string;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
