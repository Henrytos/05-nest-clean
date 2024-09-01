import { ApiProperty } from '@nestjs/swagger';

export class UploadAttachmentBodyDto {
  @ApiProperty({ type: 'buffer', format: 'binary' })
  file: Buffer;
}
