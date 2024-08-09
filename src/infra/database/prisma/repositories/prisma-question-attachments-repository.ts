import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findManyByQuestionId(questionId: string) {
    const questionsAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    });

    return questionsAttachments.map(PrismaQuestionAttachmentMapper.toDomain);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    });
  }
}
