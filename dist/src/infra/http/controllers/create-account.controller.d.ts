import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { CreateAccountBodyDto } from '../dto/create-account-body-dto';
export declare class CreateAccountController {
    private registerStudent;
    constructor(registerStudent: RegisterStudentUseCase);
    handler(body: CreateAccountBodyDto): Promise<void>;
}
