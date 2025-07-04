import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AttachmentFactory } from 'test/factories/make-attachment';
import { QuestionFactory } from 'test/factories/make-question';
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment';
import { StudentFactory } from 'test/factories/make-student';

describe('edit question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let attachmentFactory: AttachmentFactory;
  let questionAttachment: QuestionAttachmentFactory;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    jwt = moduleRef.get(JwtService);

    studentFactory = moduleRef.get(StudentFactory);

    questionFactory = moduleRef.get(QuestionFactory);

    attachmentFactory = moduleRef.get(AttachmentFactory);

    questionAttachment = moduleRef.get(QuestionAttachmentFactory);

    await app.init();
  });

  test('[PUT] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent({});

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'question title',
      content: 'question content',
    });

    await questionAttachment.makePrismaQuestionAttachments({
      questionId: question.id,
      attachmentId: attachment1.id,
    });

    await questionAttachment.makePrismaQuestionAttachments({
      questionId: question.id,
      attachmentId: attachment2.id,
    });

    const attachment3 = await attachmentFactory.makePrismaAttachment();

    const questionId = question.id.toString();

    const response = await request(app.getHttpServer())
      .put(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'new question title',
        content: 'new question content',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      });

    expect(response.statusCode).toBe(204);

    const questionAttachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId,
      },
    });

    expect(questionAttachmentsOnDatabase).toHaveLength(2);
    expect(questionAttachmentsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment3.id.toString(),
        }),
      ]),
    );
  });
});
