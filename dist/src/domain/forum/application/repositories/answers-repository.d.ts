import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '../../enterprise/entities/answer';
export declare abstract class AnswersRepository {
    abstract create(answer: Answer): Promise<void>;
    abstract findById(id: string): Promise<Answer | null>;
    abstract delete(answer: Answer): Promise<void>;
    abstract save(answer: Answer): Promise<void>;
    abstract findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
}
