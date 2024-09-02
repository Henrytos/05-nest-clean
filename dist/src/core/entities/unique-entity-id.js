"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityID = void 0;
const crypto_1 = require("crypto");
class UniqueEntityID {
    toString() {
        return this.value;
    }
    toValue() {
        return this.value;
    }
    constructor(value) {
        this.value = value ?? (0, crypto_1.randomUUID)();
    }
    equals(id) {
        return id.toValue() == this.value;
    }
}
exports.UniqueEntityID = UniqueEntityID;
//# sourceMappingURL=unique-entity-id.js.map