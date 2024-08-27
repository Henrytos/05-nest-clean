import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    minimum: 6,
  })
  password: string;
}
