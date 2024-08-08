import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"
import { FakeHasher } from "test/cryptography/fake-hasher"
import { makeStudent } from "test/factories/make-student"
import { RegisterStudentUseCase } from "./register-student"
import { StudentAlreadyExistsError } from "./erros/student-already-exists-error"

describe('register student use case (UNIT)', () => { 

  let inMemoryStudentsRepository: InMemoryStudentsRepository
  let fakeHasher:FakeHasher
  let sut: RegisterStudentUseCase

  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository
    fakeHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository,fakeHasher)
  })

  it('should be able to register student', async () => {

    const result = await sut.execute({
      name: 'Jhon doe',
      email: 'jhon@example.com',
      password:'123456'
    })
    

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0]
    })
  })
  
   it('should be able to not register student where same email exists', async () => {
     const student = makeStudent({
       email: 'jhon@example.com',
     })

     inMemoryStudentsRepository.items.push(student)
     
    const result = await sut.execute({
      name: 'Jhon doe',
      email: 'jhon@example.com',
      password:'123456'
    })
    

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(StudentAlreadyExistsError)
  })
  
})