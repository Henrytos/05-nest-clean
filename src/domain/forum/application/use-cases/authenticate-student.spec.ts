import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { AuthenticateStudentUseCase } from './authenticate-student';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { makeStudent } from 'test/factories/make-student';
import { WrongCredentialsError } from './erros/wrong-credentials-error';

describe('authenticade use case (UNIT)', () => {
  let inMemoryStudentsRepository: InMemoryStudentsRepository;
  let fakeHasher: FakeHasher;
  let encrypter: FakeEncrypter;
  let sut: AuthenticateStudentUseCase;

  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      encrypter,
    );
  });

  it('should be able to authenticate student', async () => {
    const student = makeStudent({
      email: 'john@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: student.email,
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should be able not authenticate student not exists', async () => {
    const result = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
