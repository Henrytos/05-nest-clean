import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { QuestionDetailsPresenter } from '../presenters/question-details-presenter';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlugUseCase: GetQuestionBySlugUseCase) {}

  @Get()
  @ApiTags('questions')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization Barer',
    example: 'Bearer',
  })
  @ApiParam({
    name: 'slug',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad request',
  })
  @HttpCode(HttpStatus.OK)
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
