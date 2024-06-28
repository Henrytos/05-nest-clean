import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handler(@Body() body: any) {
    const { name, email, password } = body;
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException("user exits in application");
    }

    const passwordHash = await hash(password, 9);
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }
}
