import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountBodyDto {
  @ApiProperty({
    name: 'name',
    type: String,
    example: 'John Doe',
  })
  public name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    example: 'johndoe@example.com',
  })
  public email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: '123456',
    minimum: 6,
  })
  public password: string;
}
