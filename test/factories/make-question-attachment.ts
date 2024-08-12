import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment';
import { PrismaQuestionAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-question-attachment-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachements(data: Partial<QuestionAttachmentProps>) {
    const questionAttachment = makeQuestionAttachment(data);

    /*
        await this.prisma.attachment.create({
      data: PrismaQuestionAttachmentMapper,
    });

    return questionAttachment;
    */
  }
}

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return questionAttachment;
}

