import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: AnswerAttachment[]) {
    if (attachments.length == 0) {
      return;
    }
    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments);

    await this.prisma.attachment.updateMany(data);
  }
  async deleteMany(attachments: AnswerAttachment[]) {
    if (attachments.length == 0) {
      return;
    }

    const attachmentIds = attachments.map((attachement) =>
      attachement.id.toString(),
    );

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    });
  }

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
