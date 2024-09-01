import { InvalidTypeAttachmentError } from '@/domain/forum/application/use-cases/erros/invalid-type-attachment-error';
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment';
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadAttachmentBodyDto } from '../dto/upload-attachment-body-dto';

@Controller('/attachments')
@ApiTags('uploads')
export class UploadAttachmentControllert {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadAttachmentBodyDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: '.(jpeg|jpg|png|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachment.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    });
    if (result.isLeft()) {
      switch (result.value.constructor) {
        case InvalidTypeAttachmentError:
          throw new BadRequestException({ messsage: result.value.message });
        default:
          throw new BadRequestException();
      }
    }

    return {
      attachment_id: result.value.attachment.id.toString(),
    };
  }
}
