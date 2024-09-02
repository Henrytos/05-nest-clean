import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { Question } from '../entities/question';
export declare class QuestionBestAnswerChosenEvent implements DomainEvent {
    ocurredAt: Date;
    question: Question;
    bestAnswerId: UniqueEntityID;
    constructor(question: Question, bestAnswerId: UniqueEntityID);
    getAggregateId(): UniqueEntityID;
}
