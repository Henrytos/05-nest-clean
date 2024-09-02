import { Answer } from '@/domain/forum/enterprise/entities/answer';
export declare class AnswerPresenter {
    static toHTTP(answer: Answer): {
        content: string;
        attachments: any[];
        createdAt: Date;
        updatedAt: Date;
    };
}
