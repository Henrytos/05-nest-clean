import { Either, left, right } from "@/core/either"
import { StudentsRepository } from "../repositories/students-repository"
import { HashCompare } from "../cryptography/hash-compare"
import { Encrypter } from "../cryptography/encrypter"
import { WrongCredentialsError } from "./erros/wrong-credentials-error"

interface AuthenticateStudentUseCaseRequest{
  email: string,
  password:string
}
type AuthenticateStudentUseCaseResponse = Either<Error, {
  accessToken: string
}>

export class AuthenticateStudentUseCase { 
  constructor(
    private studentRespository: StudentsRepository,
    private hashCompare: HashCompare,
    private encrypter:Encrypter
  ) { }

  async execute({  email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> { 
    
    const student = await this.studentRespository.findByEmail(email);

    if (!student) { 
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(password,student.password)
    
    if(!isPasswordValid){
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({sub:student.id.toString()})

    return right({accessToken})
  }

}