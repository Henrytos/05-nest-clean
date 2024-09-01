import { ApiProperty } from '@nestjs/swagger';

export class CommentOnAnswerBodyDto {
  @ApiProperty({
    name: 'content',
    type: 'string',
  })
  public content: string;
}
