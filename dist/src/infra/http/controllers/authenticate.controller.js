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
exports.AuthenticateController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const authenticate_student_1 = require("../../../domain/forum/application/use-cases/authenticate-student");
const wrong_credentials_error_1 = require("../../../domain/forum/application/use-cases/erros/wrong-credentials-error");
const public_1 = require("../../auth/public");
const swagger_1 = require("@nestjs/swagger");
const authenticate_body_dto_1 = require("../dto/authenticate-body-dto");
const access_token_dto_1 = require("../dto/access-token-dto");
const authenticateBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
let AuthenticateController = class AuthenticateController {
    constructor(authenticateStudent) {
        this.authenticateStudent = authenticateStudent;
    }
    async handle(body) {
        const { email, password } = body;
        const result = await this.authenticateStudent.execute({
            email,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.BadRequestException(result.value.message);
            }
        }
        const { accessToken } = result.value;
        return {
            access_token: accessToken,
        };
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)('sing in'),
    (0, swagger_1.ApiBody)({ type: authenticate_body_dto_1.AuthenticateBodyDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Authenticated',
        type: access_token_dto_1.AccessTokenDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Credentials are not valid.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(authenticateBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticate_body_dto_1.AuthenticateBodyDto]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "handle", null);
exports.AuthenticateController = AuthenticateController = __decorate([
    (0, public_1.Public)(),
    (0, common_1.Controller)('/sessions'),
    __metadata("design:paramtypes", [authenticate_student_1.AuthenticateStudentUseCase])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map