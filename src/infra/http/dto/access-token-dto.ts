import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({})
  public access_token: string;
}
