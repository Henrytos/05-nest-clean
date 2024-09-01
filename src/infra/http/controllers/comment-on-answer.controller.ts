import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
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
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentOnAnswerBodyDto } from '../dto/comment-on-answer-body-dto';

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
});

const commentOnAnswerValidatePipe = new ZodValidationPipe(
  commentOnAnswerBodySchema,
);

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswerUseCase: CommentOnAnswerUseCase) {}

  @Post()
  @ApiTags('answer comments')
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
    @Body(commentOnAnswerValidatePipe) body: CommentOnAnswerBodyDto,
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
