import { ApiProperty } from '@nestjs/swagger';

export class UploadAttachmentResponseDto {
  @ApiProperty({
    title: 'attachmentId',
    type: String,
    example: 'attachment-uuid-1',
  })
  public attachment_id: string;
}
