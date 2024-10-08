import { ApiProperty } from '@nestjs/swagger';

export class AnswerQuestionBodyDto {
  @ApiProperty({
    name: 'content',
    type: String,
  })
  public content: string;

  @ApiProperty({
    name: 'content',
    type: [String],
  })
  public attachments: string[];
}
