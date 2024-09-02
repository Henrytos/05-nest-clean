"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaStudentMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const student_1 = require("../../../../domain/forum/enterprise/entities/student");
class PrismaStudentMapper {
    static toDomain(raw) {
        return student_1.Student.create({
            name: raw.name,
            email: raw.email,
            password: raw.password,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(student) {
        return {
            id: student.id.toString(),
            name: student.name,
            email: student.email,
            password: student.password,
        };
    }
}
exports.PrismaStudentMapper = PrismaStudentMapper;
//# sourceMappingURL=prisma-student-mapper.js.map