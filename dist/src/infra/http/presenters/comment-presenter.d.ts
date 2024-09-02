import { Comment } from '@/domain/forum/enterprise/entities/comment';
export declare class CommentPresenter {
    static toHTTP(comment: Comment<any>): {
        id: string;
        content: string;
        createdAt: Date;
        updateAt: Date;
    };
}
