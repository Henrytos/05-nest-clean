import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repostory';
import { makeStudent } from 'test/factories/make-student';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('get question by slug use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able get question by slug', async () => {
    const author = makeStudent();
    inMemoryStudentsRepository.items.push(author);

    const newQuestion = makeQuestion({
      slug: Slug.create('sample-slug'),
      authorId: author.id,
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'sample-slug',
    });

    expect(result.isRight()).toEqual(true);
  });

  it('shouldnt be able to get questions by slug if it doesnt exist', async () => {
    const author = makeStudent();
    inMemoryStudentsRepository.items.push(author);

    const result = await sut.execute({
      slug: 'sample-slug',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
