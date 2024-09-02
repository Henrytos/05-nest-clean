"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTypeAttachmentError = void 0;
class InvalidTypeAttachmentError extends Error {
    constructor(type) {
        super(`The attachment type "${type}" is invalid.`);
    }
}
exports.InvalidTypeAttachmentError = InvalidTypeAttachmentError;
//# sourceMappingURL=invalid-type-attachment-error.js.map