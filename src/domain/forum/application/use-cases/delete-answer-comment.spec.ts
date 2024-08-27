import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;
let inMemoryStudentsRepository: InMemoryStudentsRepository;

describe('delete answer comment use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able delete answer comments', async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    expect(inMemoryAnswerCommentsRepository.items.length).toEqual(1);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items.length).toEqual(0);
  });

  it('should not be able delete answer comments where author id invalid', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.isRight()).toEqual(false);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it('should not be able to edit answer comment if it does not exist', async () => {
    const result = await sut.execute({
      authorId: 'invalid-author-id',
      answerCommentId: 'invalid-answer-comment-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
