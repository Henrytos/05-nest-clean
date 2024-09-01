import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class AnswerQuestionBodyDto {
  @ApiProperty()
  public content: string;
  @ApiProperty({ type: [String], description: 'Array of attachment ids' })
  public attachments: string[];
}
