"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAlreadyExistsError = void 0;
class StudentAlreadyExistsError extends Error {
    constructor(identifier) {
        super(`student with same ${identifier} already exists`);
    }
}
exports.StudentAlreadyExistsError = StudentAlreadyExistsError;
//# sourceMappingURL=student-already-exists-error.js.map