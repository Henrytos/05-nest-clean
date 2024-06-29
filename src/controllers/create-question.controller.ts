import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Controller("/questions")
@UseGuards(AuthGuard)
export class CreateQuestionController {
  @Post()
  handler() {
    return "ok";
  }
}
