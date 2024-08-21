import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { QuestionDetailsPresenter } from '../presenters/question-details-presenter';

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlugUseCase: GetQuestionBySlugUseCase) {}

  @Get()
  async handler(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlugUseCase.execute({
      slug,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) };
  }
}
