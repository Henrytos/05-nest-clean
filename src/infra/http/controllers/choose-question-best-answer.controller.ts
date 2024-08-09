import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.chooseQuestionBestAnswer.execute({
      answerId,
      authorId: user.sub,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
