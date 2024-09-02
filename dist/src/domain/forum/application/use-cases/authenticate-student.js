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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateStudentUseCase = void 0;
const either_1 = require("../../../../core/either");
const students_repository_1 = require("../repositories/students-repository");
const hash_compare_1 = require("../cryptography/hash-compare");
const encrypter_1 = require("../cryptography/encrypter");
const wrong_credentials_error_1 = require("./erros/wrong-credentials-error");
const common_1 = require("@nestjs/common");
let AuthenticateStudentUseCase = class AuthenticateStudentUseCase {
    constructor(studentRespository, hashComparer, encrypter) {
        this.studentRespository = studentRespository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
    }
    async execute({ email, password, }) {
        const student = await this.studentRespository.findByEmail(email);
        if (!student) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const isPasswordValid = await this.hashComparer.compare(password, student.password);
        if (!isPasswordValid) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const accessToken = await this.encrypter.encrypt({
            sub: student.id.toString(),
        });
        return (0, either_1.right)({ accessToken });
    }
};
exports.AuthenticateStudentUseCase = AuthenticateStudentUseCase;
exports.AuthenticateStudentUseCase = AuthenticateStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository,
        hash_compare_1.HashComparer,
        encrypter_1.Encrypter])
], AuthenticateStudentUseCase);
//# sourceMappingURL=authenticate-student.js.map