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
exports.CreateQuestionBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateQuestionBodyDto {
}
exports.CreateQuestionBodyDto = CreateQuestionBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'title',
        type: String,
        example: 'How to create a new question',
    }),
    __metadata("design:type", String)
], CreateQuestionBodyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'content',
        type: String,
        example: 'How to create a new question',
    }),
    __metadata("design:type", String)
], CreateQuestionBodyDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'attachments',
        type: [String],
        example: ['attachment-uuid-1', 'attachment-uuid-2'],
    }),
    __metadata("design:type", Array)
], CreateQuestionBodyDto.prototype, "attachments", void 0);
//# sourceMappingURL=create-question-body-dto.js.map