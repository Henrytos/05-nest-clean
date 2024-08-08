import { Either, left, right } from '@/core/either';
import { StudentsRepository } from '../repositories/students-repository';
import { HashComparer } from '../cryptography/hash-compare';
import { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from './erros/wrong-credentials-error';
import { Injectable } from '@nestjs/common';

interface AuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}
type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRespository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRespository.findByEmail(email);

    if (!student) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    });

    return right({ accessToken });
  }
}
