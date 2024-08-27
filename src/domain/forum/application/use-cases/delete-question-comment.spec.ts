import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('delete question comment use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able delete question comments', async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    expect(inMemoryQuestionCommentsRepository.items.length).toEqual(1);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items.length).toEqual(0);
  });

  it('should not be able delete question comments where author id invalid ', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    expect(inMemoryQuestionCommentsRepository.items.length).toEqual(1);

    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it('should not be able to edit question comment if it does not exist', async () => {
    const result = await sut.execute({
      authorId: 'invalid-author-id',
      questionCommentId: 'invalid-question-comment-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
