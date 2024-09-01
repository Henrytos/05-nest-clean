import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    minimum: 6,
    example: '123456',
  })
  password: string;
}
