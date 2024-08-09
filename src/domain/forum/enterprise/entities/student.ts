import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface StudentProps {
  name: string;
  password: string;
  email: string;
}
export class Student extends Entity<StudentProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id);
    return student;
  }
}
