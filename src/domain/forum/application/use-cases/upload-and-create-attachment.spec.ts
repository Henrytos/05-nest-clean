import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repostory';
import { AttachmentsRepository } from '../repositories/attachments-repository';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';
import { Uploader } from '../storage/uploader';
import { FakerUploader } from 'test/storage/fake-uploader';
import { InvalidTypeAttachmentError } from './erros/invalid-type-attachment-error';

describe('upload and create attachemnt use case (UNIT)', () => {
  let sut: UploadAndCreateAttachmentUseCase;
  let inMemeoryAttachmentsRepository: InMemoryAttachmentsRepository;
  let fakeUploader: FakerUploader;

  beforeEach(() => {
    inMemeoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    fakeUploader = new FakerUploader();
    sut = new UploadAndCreateAttachmentUseCase(
      inMemeoryAttachmentsRepository,
      fakeUploader,
    );
  });

  it('should be possible to create and save attachment ', async () => {
    const result = await sut.execute({
      body: Buffer.from(''),
      fileName: 'profile.png',
      fileType: 'image/png',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemeoryAttachmentsRepository.attachments).toHaveLength(1);
    expect(result.value).toEqual({
      attachment: inMemeoryAttachmentsRepository.attachments[0],
    });
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    );
  });

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'image/mpeg',
      body: Buffer.from(''),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidTypeAttachmentError);
  });
});
