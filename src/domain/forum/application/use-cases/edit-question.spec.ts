import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repostory';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe('edit question use case (UNIT)', () => {
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
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    );
  });

  it('should be able edit question', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    );

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    );

    inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-01',
      content: 'content',
      title: 'question',
      attachmentsIds: ['1', '3'],
    });

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ]);
  });

  it('should be able edit question where author id invalid', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    );

    inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-02',
      content: 'content',
      title: 'question',
      attachmentsIds: [],
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.isRight()).toEqual(false);
  });

  it('should sync new and removed attachment when editing a question', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    );

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    );

    inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-01',
      content: 'content',
      title: 'question',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2);
    expect(inMemoryQuestionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('3'),
        }),
      ]),
    );
  });

  it('should not be able to edit question if it does not exist', async () => {
    const result = await sut.execute({
      questionId: 'invalid-question-id',
      attachmentsIds: [],
      authorId: 'invalid-author-id',
      content: 'example content',
      title: 'example title',
    });
    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
