import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestionUseCase: DeleteQuestionUseCase) {}

  @Delete()
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const result = await this.deleteQuestionUseCase.execute({
      authorId: user.sub,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
