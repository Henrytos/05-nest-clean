import { ApiProperty } from '@nestjs/swagger';

export class EditAnswerBodyDto {
  @ApiProperty({
    name: 'content',
    type: String,
    example: 'How to create a new question',
  })
  public content: string;

  @ApiProperty({
    name: 'attachments',
    type: [String],
    example: ['attachment-uuid-1', 'attachment-uuid-2'],
  })
  public attachments: string[];
}
