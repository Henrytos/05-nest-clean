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
exports.PrismaStudentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_student_mapper_1 = require("../mappers/prisma-student-mapper");
let PrismaStudentsRepository = class PrismaStudentsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const student = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!student) {
            return null;
        }
        return prisma_student_mapper_1.PrismaStudentMapper.toDomain(student);
    }
    async create(student) {
        const data = prisma_student_mapper_1.PrismaStudentMapper.toPrisma(student);
        await this.prisma.user.create({
            data,
        });
    }
};
exports.PrismaStudentsRepository = PrismaStudentsRepository;
exports.PrismaStudentsRepository = PrismaStudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaStudentsRepository);
//# sourceMappingURL=prisma-students-repository.js.map