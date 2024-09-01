import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateBodyDto {
  @ApiProperty({
    type: 'string',
    example: 'jonhdoe@example.com',
  })
  public email: string;
  @ApiProperty({
    type: 'string',
    example: '123456',
  })
  public password: string;
}
