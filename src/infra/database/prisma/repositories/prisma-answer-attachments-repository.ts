import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper';

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findManyByAnswerId(answerId: string) {
    const answersAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    });

    return answersAttachments.map(PrismaAnswerAttachmentMapper.toDomain);
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }
}
