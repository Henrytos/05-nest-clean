import { WatchedList } from '@/core/entities/watched-list';
import { QuestionAttachment } from './question-attachment';
export declare class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
    compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean;
}
