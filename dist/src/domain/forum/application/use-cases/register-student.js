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
exports.RegisterStudentUseCase = void 0;
const either_1 = require("../../../../core/either");
const student_1 = require("../../enterprise/entities/student");
const students_repository_1 = require("../repositories/students-repository");
const hash_generator_1 = require("../cryptography/hash-generator");
const student_already_exists_error_1 = require("./erros/student-already-exists-error");
const common_1 = require("@nestjs/common");
let RegisterStudentUseCase = class RegisterStudentUseCase {
    constructor(studentRespository, hashGenerator) {
        this.studentRespository = studentRespository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ name, email, password, }) {
        const studentWithSameEmail = await this.studentRespository.findByEmail(email);
        if (studentWithSameEmail) {
            return (0, either_1.left)(new student_already_exists_error_1.StudentAlreadyExistsError(email));
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        const student = student_1.Student.create({ name, email, password: hashedPassword });
        await this.studentRespository.create(student);
        return (0, either_1.right)({ student });
    }
};
exports.RegisterStudentUseCase = RegisterStudentUseCase;
exports.RegisterStudentUseCase = RegisterStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository,
        hash_generator_1.HashGenerator])
], RegisterStudentUseCase);
//# sourceMappingURL=register-student.js.map