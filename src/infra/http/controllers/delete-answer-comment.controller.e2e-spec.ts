import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';
import request from 'supertest';
import { AnswerCommentFactory } from 'test/factories/make-answer-comment';
import { AnswerFactory } from 'test/factories/make-answer';
describe('delete answer comment (E2E)', () => {
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

    answerCommentFactory = moduleRef.get(AnswerCommentFactory);

    answerFactory = moduleRef.get(AnswerFactory);

    await app.init();
  });

  test('[DELETE] /answers/comments/:id', async () => {
    const user = await studentFactory.makePrismaStudent({});
    const accessToken = jwt.sign({ sub: user.id.toString() });
    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    });

    const answerComment = await answerCommentFactory.makePrismaAnswerComment({
      authorId: user.id,
      answerId: answer.id,
      content: 'comment content',
    });

    const answerCommentId = answerComment.id.toString();

    const response = await request(app.getHttpServer())
      .delete(`/answers/comments/${answerCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(204);

    const questionCommentOnDatabase = await prisma.comment.findFirst({
      where: {
        content: 'comment content',
      },
    });

    expect(questionCommentOnDatabase).toBeNull();
  });
});
