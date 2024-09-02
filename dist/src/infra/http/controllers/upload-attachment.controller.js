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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAttachmentControllert = void 0;
const invalid_type_attachment_error_1 = require("../../../domain/forum/application/use-cases/erros/invalid-type-attachment-error");
const upload_and_create_attachment_1 = require("../../../domain/forum/application/use-cases/upload-and-create-attachment");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const upload_attachment_body_dto_1 = require("../dto/upload-attachment-body-dto");
const upload_attachment_response_dto_1 = require("../dto/upload-attachment-response.dto");
let UploadAttachmentControllert = class UploadAttachmentControllert {
    constructor(uploadAndCreateAttachment) {
        this.uploadAndCreateAttachment = uploadAndCreateAttachment;
    }
    async uploadFile(file) {
        const result = await this.uploadAndCreateAttachment.execute({
            fileName: file.originalname,
            fileType: file.mimetype,
            body: file.buffer,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case invalid_type_attachment_error_1.InvalidTypeAttachmentError:
                    throw new common_1.BadRequestException({ messsage: result.value.message });
                default:
                    throw new common_1.BadRequestException();
            }
        }
        return {
            attachment_id: result.value.attachment.id.toString(),
        };
    }
};
exports.UploadAttachmentControllert = UploadAttachmentControllert;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)('uploads'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        type: upload_attachment_body_dto_1.UploadAttachmentBodyDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: upload_attachment_response_dto_1.UploadAttachmentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'The attachment type type is invalid.',
        type: common_1.BadRequestException,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
            new common_1.FileTypeValidator({ fileType: '.(jpeg|jpg|png|pdf)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadAttachmentControllert.prototype, "uploadFile", null);
exports.UploadAttachmentControllert = UploadAttachmentControllert = __decorate([
    (0, common_1.Controller)('/attachments'),
    __metadata("design:paramtypes", [upload_and_create_attachment_1.UploadAndCreateAttachmentUseCase])
], UploadAttachmentControllert);
//# sourceMappingURL=upload-attachment.controller.js.map