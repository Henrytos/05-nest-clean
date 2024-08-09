import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema);

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>;
@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestionUseCase: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handler(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { content, title } = body;

    const result = await this.editQuestionUseCase.execute({
      content,
      title,
      questionId,
      authorId: user.sub,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
