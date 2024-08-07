import { Either, left, right } from "@/core/either"
import { Student } from "../../enterprise/entities/student"
import { StudentsRepository } from "../repositories/students-repository"
import { HashGenerator } from "../cryptography/hash-generator"
import { StudentAlreadyExistsError } from "./erros/student-already-exists-error"

interface RegisterStudentUseCaseRequest{
  name: string,
  email: string,
  password:string
}
type RegisterStudentUseCaseResponse = Either<Error, {
  student: Student
}>

export class RegisterStudentUseCase { 
  constructor(private studentRespository: StudentsRepository,private hashGenerator:HashGenerator) { }

  async execute({ name, email, password }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> { 
    
    const studentWithSameEmail = await this.studentRespository.findByEmail(email);

    if (studentWithSameEmail) { 
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    
    const student = Student.create({ name, email, password: hashedPassword });
    
    await this.studentRespository.create(student);

    return right({student})
  }

}