import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtEncrypter } from './jwt-encrypter';
import { BcryptGenerator } from './bcrypt-generator';
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';
import { HashComparer } from '@/domain/forum/application/cryptography/hash-compare';
import { BcryptComparer } from './bcrypt-comparer';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptGenerator },
    { provide: HashComparer, useClass: BcryptComparer },
    JwtService,
  ],
  exports: [JwtEncrypter, BcryptGenerator, BcryptGenerator],
})
export class CryptographyModule {}
