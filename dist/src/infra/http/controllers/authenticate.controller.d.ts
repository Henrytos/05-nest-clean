import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { AuthenticateBodyDto } from '../dto/authenticate-body-dto';
export declare class AuthenticateController {
    private authenticateStudent;
    constructor(authenticateStudent: AuthenticateStudentUseCase);
    handle(body: AuthenticateBodyDto): Promise<{
        access_token: string;
    }>;
}
