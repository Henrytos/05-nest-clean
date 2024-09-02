"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructor = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Instructor extends entity_1.Entity {
    static create(props, id) {
        const instructor = new Instructor(props, id);
        return instructor;
    }
}
exports.Instructor = Instructor;
//# sourceMappingURL=instructor.js.map