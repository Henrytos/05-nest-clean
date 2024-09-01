import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswerQuestionBodyDto } from '../dto/answer-question-body-dto';
import { UserRole } from '@prisma/client';

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema);

@ApiHeader({
  enum: UserRole,
  name: 'Authorization Bearer',
  description: 'role',
  example: 'Bearer',
})
@ApiTags('Questions')
@Controller('/questions/:questionId/answer')
export class AnswerQuestionController {
  constructor(private answerQuestionUseCase: AnswerQuestionUseCase) {}

  @ApiBody({ type: AnswerQuestionBodyDto })
  @ApiParam({ name: 'questionId', type: 'string' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Body(bodyValidationPipe) body: AnswerQuestionBodyDto,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body;
    const result = await this.answerQuestionUseCase.execute({
      authorId: user.sub,
      attachmentsIds: attachments,
      content,
      questionId,
    });
    if (result.isLeft()) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST);
    }
  }
}
