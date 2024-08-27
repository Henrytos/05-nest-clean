import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;

let sut: CommentOnAnswerUseCase;

describe('create answer use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository,
    );
  });

  it('should be able create answer', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') });
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: answer.authorId.toValue(),
      content: 'example content',
      answerId: answer.id.toValue(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryAnswerCommentRepository.items[0]).toEqual(
      expect.objectContaining({
        authorId: answer.authorId,
        answerId: answer.id,
      }),
    );
  });

  it('should not be able to comment on a answer that does not exist', async () => {
    const result = await sut.execute({
      authorId: 'invalid-author-id',
      content: 'content example',
      answerId: 'invalid-answer-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
