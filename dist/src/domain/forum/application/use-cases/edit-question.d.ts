import { Either } from '@/core/either';
import { QuestionsRepository } from '../repositories/question-repository';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';
interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}
type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class EditQuestionUseCase {
    private questionsRepository;
    private questionAttachmentsRepository;
    constructor(questionsRepository: QuestionsRepository, questionAttachmentsRepository: QuestionAttachmentsRepository);
    execute({ authorId, questionId, content, title, attachmentsIds, }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>;
}
export {};
