import { Either } from '@/core/either';
import { StudentsRepository } from '../repositories/students-repository';
import { HashComparer } from '../cryptography/hash-compare';
import { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from './erros/wrong-credentials-error';
interface AuthenticateStudentUseCaseRequest {
    email: string;
    password: string;
}
type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string;
}>;
export declare class AuthenticateStudentUseCase {
    private studentRespository;
    private hashComparer;
    private encrypter;
    constructor(studentRespository: StudentsRepository, hashComparer: HashComparer, encrypter: Encrypter);
    execute({ email, password, }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse>;
}
export {};
