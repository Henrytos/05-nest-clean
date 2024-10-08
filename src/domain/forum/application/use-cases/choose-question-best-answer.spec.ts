import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repostory';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

let sut: ChooseQuestionBestAnswerUseCase;

describe('choose question best answer use case (UNIT)', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    );

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    );
  });

  it('should be able choose question best answer in question', async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryAnswersRepository.create(answer);
    inMemoryQuestionsRepository.create(question);

    await sut.execute({
      answerId: answer.id.toValue(),
      authorId: question.authorId.toValue(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id,
    );
  });

  it('should not be able choose question best answer in question where author id invalid', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-01'),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryAnswersRepository.create(answer);
    inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'author-02',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it('shouldnt be possible to demand a better answer if it doesnt exist', async () => {
    const result = await sut.execute({
      answerId: 'invalid-answer-id',
      authorId: 'invalid-author-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('shouldnt be possible to demand a better answer if it doesnt exist', async () => {
    const result = await sut.execute({
      answerId: 'invalid-answer-id',
      authorId: 'invalid-author-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('shouldnt be possible to demand a better question if it doesnt exist', async () => {
    const answer = makeAnswer({});

    inMemoryAnswersRepository.items.push(answer);

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'invalid-author-id',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
