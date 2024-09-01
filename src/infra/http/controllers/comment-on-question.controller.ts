import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  ApiTags,
  ApiHeader,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentOnAnswerBodyDto } from '../dto/comment-on-answer-body-dto';

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
  @ApiTags('question comments')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization Bearer',
    required: true,
  })
  @ApiBody({ type: CommentOnAnswerBodyDto })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
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
