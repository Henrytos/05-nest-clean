"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Student extends entity_1.Entity {
    get email() {
        return this.props.email;
    }
    get name() {
        return this.props.name;
    }
    get password() {
        return this.props.password;
    }
    static create(props, id) {
        const student = new Student(props, id);
        return student;
    }
}
exports.Student = Student;
//# sourceMappingURL=student.js.map