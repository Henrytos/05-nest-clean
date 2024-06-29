import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handler(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { content, title } = body;
    const userId = user.sub;
    const slug = this.covertToSlug(title);

    await this.prisma.question.create({
      data: {
        content,
        slug,
        title,
        authorId: userId,
      },
    });
  }

  covertToSlug(title: string): string {
    title = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    title = title.replace(/[^a-zA-Z0-9\s-]/g, "");
    title = title.replace(/\s+/g, "-");
    title = title.toLowerCase();
    title = title.replace(/-+/g, "-");
    title = title.replace(/^-|-$/g, "");
    return title;
  }
}
