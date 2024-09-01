import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/erros/wrong-credentials-error';
import { Public } from '@/infra/auth/public';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateBodyDto } from '../dto/authenticate-body-dto';
import { AccessTokenDto } from '../dto/access-token-dto';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

@Public()
@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @ApiTags('sing in')
  @ApiBody({ type: AuthenticateBodyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authenticated',
    type: AccessTokenDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credentials are not valid.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodyDto) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(result.value.message);
        default:
          throw new BadRequestException(result.value.message);
      }
    }

    const { accessToken } = result.value;
    return {
      access_token: accessToken,
    };
  }
}
