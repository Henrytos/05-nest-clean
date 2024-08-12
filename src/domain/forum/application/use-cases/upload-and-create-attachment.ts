import { Either, left, right } from '@/core/either';
import { StudentAlreadyExistsError } from './erros/student-already-exists-error';
import { Injectable } from '@nestjs/common';
import { Attachment } from '../../enterprise/entities/attachment';
import { AttachmentsRepository } from '../repositories/attachments-repository';
import { Uploader } from '../storage/uploader';
import { InvalidTypeAttachmentError } from './erros/invalid-type-attachment-error';

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}
type UploadAndCreateAttachmentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  { attachment: Attachment }
>;

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRespository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidTypeAttachmentError(fileType));
    }
    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const attachment = Attachment.create({ title: fileName, url });

    await this.attachmentRespository.create(attachment);

    return right({ attachment });
  }
}
