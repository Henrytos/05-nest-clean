import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';
import request from 'supertest';
import { QuestionCommentFactory } from 'test/factories/make-question-comment';

describe('fetch question comment (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let questionCommentFactory: QuestionCommentFactory;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    jwt = moduleRef.get(JwtService);

    studentFactory = moduleRef.get(StudentFactory);

    questionFactory = moduleRef.get(QuestionFactory);

    questionCommentFactory = moduleRef.get(QuestionCommentFactory);

    await app.init();
  });

  test('[GET] /questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({});
    const accessToken = jwt.sign({ sub: user.id.toString() });
    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    await Promise.all([
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'comment content',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'comment content',
      }),
    ]);

    const questionId = question.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/comments`)
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
