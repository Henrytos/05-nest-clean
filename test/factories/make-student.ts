import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { faker } from '@faker-js/faker';

export function makeStudent(
  override: Partial<Student> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.seed.name,
      ...override,
    },
    id,
  );

  return student;
}
