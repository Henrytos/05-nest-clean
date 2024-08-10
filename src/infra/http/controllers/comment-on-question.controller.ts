import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
});

type CommentOnQuestionBody = z.infer<typeof commentOnQuestionBodySchema>;

const commentOnQuestionValidatePipe = new ZodValidationPipe(
  commentOnQuestionBodySchema,
);

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestionUseCase: CommentOnQuestionUseCase) {}

  @Post()
  async handler(
    @CurrentUser() user: UserPayload,
    @Body(commentOnQuestionValidatePipe) body: CommentOnQuestionBody,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body;

    const result = await this.commentOnQuestionUseCase.execute({
      questionId,
      authorId: user.sub,
      content,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
