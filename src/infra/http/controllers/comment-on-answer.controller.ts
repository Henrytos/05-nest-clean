import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
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

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
});

type CommentOnAnswerBody = z.infer<typeof commentOnAnswerBodySchema>;

const commentOnAnswerValidatePipe = new ZodValidationPipe(
  commentOnAnswerBodySchema,
);

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswerUseCase: CommentOnAnswerUseCase) {}

  @Post()
  async handler(
    @CurrentUser() user: UserPayload,
    @Body(commentOnAnswerValidatePipe) body: CommentOnAnswerBody,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body;

    const result = await this.commentOnAnswerUseCase.execute({
      answerId,
      authorId: user.sub,
      content,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
