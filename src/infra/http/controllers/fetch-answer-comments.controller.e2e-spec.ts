import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';
import request from 'supertest';
import { AnswerFactory } from 'test/factories/make-answer';
import { AnswerCommentFactory } from 'test/factories/make-answer-comment';

describe('fetch answer comments (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;
  let answerCommentFactory: AnswerCommentFactory;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerCommentFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    jwt = moduleRef.get(JwtService);

    studentFactory = moduleRef.get(StudentFactory);

    questionFactory = moduleRef.get(QuestionFactory);

    answerFactory = moduleRef.get(AnswerFactory);

    answerCommentFactory = moduleRef.get(AnswerCommentFactory);

    await app.init();
  });

  test('[GET] /answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({});
    const accessToken = jwt.sign({ sub: user.id.toString() });
    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
      content: 'answer content',
    });

    await Promise.all([
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'comment content',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'comment content',
      }),
    ]);

    const answerId = answer.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.comments).toHaveLength(2);
    expect(response.body.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: 'comment content',
        }),
        expect.objectContaining({
          content: 'comment content',
        }),
      ]),
    );
  });
});
