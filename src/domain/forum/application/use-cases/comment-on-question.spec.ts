import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import {} from './create-question';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let sut: CommentOnQuestionUseCase;

describe('create question use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    );
  });

  it('should be able create question', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') });
    await inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      authorId: question.authorId.toValue(),
      content: 'example content',
      questionId: question.id.toValue(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryQuestionCommentRepository.items[0]).toEqual(
      expect.objectContaining({
        questionId: question.id,
        content: 'example content',
      }),
    );
  });
});
