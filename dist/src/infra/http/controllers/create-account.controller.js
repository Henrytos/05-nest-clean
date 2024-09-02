"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const register_student_1 = require("../../../domain/forum/application/use-cases/register-student");
const student_already_exists_error_1 = require("../../../domain/forum/application/use-cases/erros/student-already-exists-error");
const public_1 = require("../../auth/public");
const swagger_1 = require("@nestjs/swagger");
const create_account_body_dto_1 = require("../dto/create-account-body-dto");
const createAccountBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
let CreateAccountController = class CreateAccountController {
    constructor(registerStudent) {
        this.registerStudent = registerStudent;
    }
    async handler(body) {
        const { name, email, password } = body;
        const result = await this.registerStudent.execute({
            name,
            email,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case student_already_exists_error_1.StudentAlreadyExistsError:
                    throw new common_1.ConflictException(result.value.message);
                default:
                    throw new common_1.BadRequestException(result.value.message);
            }
        }
    }
};
exports.CreateAccountController = CreateAccountController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)('sing up'),
    (0, swagger_1.ApiBody)({ type: create_account_body_dto_1.CreateAccountBodyDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'student with same email already exists',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createAccountBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_body_dto_1.CreateAccountBodyDto]),
    __metadata("design:returntype", Promise)
], CreateAccountController.prototype, "handler", null);
exports.CreateAccountController = CreateAccountController = __decorate([
    (0, public_1.Public)(),
    (0, common_1.Controller)('/accounts'),
    __metadata("design:paramtypes", [register_student_1.RegisterStudentUseCase])
], CreateAccountController);
//# sourceMappingURL=create-account.controller.js.map