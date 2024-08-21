import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('fetch  answer comment  use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able fetch answers comments  ', async () => {
    const author = makeStudent({
      id: new UniqueEntityID('author-1'),
    });
    inMemoryStudentsRepository.items.push(author);

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    const result = await sut.execute({
      page: 1,
      answerId: 'author-1',
    });

    expect(result.value?.comments).toHaveLength(3);
  });

  it('should be able fetch question answers page 2 recent question ', async () => {
    const author = makeStudent({ id: new UniqueEntityID('author-1') });
    inMemoryStudentsRepository.items.push(author);

    const answerComment = makeAnswerComment({
      answerId: new UniqueEntityID('author-1'),
      authorId: author.id,
    });

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(answerComment);
    }

    const result = await sut.execute({
      page: 2,
      answerId: 'author-1',
    });

    expect(result.value?.comments).toHaveLength(2);
  });
});
