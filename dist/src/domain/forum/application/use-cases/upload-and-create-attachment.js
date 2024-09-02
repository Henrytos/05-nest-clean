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
exports.UploadAndCreateAttachmentUseCase = void 0;
const either_1 = require("../../../../core/either");
const common_1 = require("@nestjs/common");
const attachment_1 = require("../../enterprise/entities/attachment");
const attachments_repository_1 = require("../repositories/attachments-repository");
const uploader_1 = require("../storage/uploader");
const invalid_type_attachment_error_1 = require("./erros/invalid-type-attachment-error");
let UploadAndCreateAttachmentUseCase = class UploadAndCreateAttachmentUseCase {
    constructor(attachmentRespository, uploader) {
        this.attachmentRespository = attachmentRespository;
        this.uploader = uploader;
    }
    async execute({ fileName, fileType, body, }) {
        if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
            return (0, either_1.left)(new invalid_type_attachment_error_1.InvalidTypeAttachmentError(fileType));
        }
        const { url } = await this.uploader.upload({ fileName, fileType, body });
        const attachment = attachment_1.Attachment.create({ title: fileName, url });
        await this.attachmentRespository.create(attachment);
        return (0, either_1.right)({ attachment });
    }
};
exports.UploadAndCreateAttachmentUseCase = UploadAndCreateAttachmentUseCase;
exports.UploadAndCreateAttachmentUseCase = UploadAndCreateAttachmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attachments_repository_1.AttachmentsRepository,
        uploader_1.Uploader])
], UploadAndCreateAttachmentUseCase);
//# sourceMappingURL=upload-and-create-attachment.js.map