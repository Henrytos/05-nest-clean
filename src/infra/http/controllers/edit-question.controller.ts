import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { EditAnswerBodyDto } from '../dto/edit-answer-body-dto';
import { EditQuestionBodyDto } from '../dto/edit-question-body-dto';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema);

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestionUseCase: EditQuestionUseCase) {}

  @Put()
  @ApiTags('questions')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization Bearer',
    example: 'Bearer',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: EditQuestionBodyDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @Body(bodyValidationPipe) body: EditQuestionBodyDto,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { content, title, attachments } = body;

    const result = await this.editQuestionUseCase.execute({
      content,
      title,
      questionId,
      authorId: user.sub,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
