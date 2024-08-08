import { HashComparer } from "@/domain/forum/application/cryptography/hash-compare";
import { Injectable } from "@nestjs/common";
import { compare } from "bcryptjs";

@Injectable()
export class BcryptComparer implements  HashComparer {

  compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload,hash)
  }
}