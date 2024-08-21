import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsUseCase } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('fetch question question  use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able fetch questions comments  ', async () => {
    const author = makeStudent({
      id: new UniqueEntityID('author-1'),
    });
    inMemoryStudentsRepository.items.push(author);

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('author-1'),
        authorId: author.id,
      }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: 'author-1',
    });

    expect(result.value?.comments).toHaveLength(3);
  });

  it('should be able fetch question questions page 2 recent question ', async () => {
    const author = makeStudent({ id: new UniqueEntityID('author-1') });
    inMemoryStudentsRepository.items.push(author);

    const questionComment = makeQuestionComment({
      questionId: new UniqueEntityID('author-1'),
      authorId: author.id,
    });

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(questionComment);
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'author-1',
    });

    expect(result.value?.comments).toHaveLength(2);
  });
});
