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
exports.ReadNotificationController = void 0;
const not_allowed_error_1 = require("../../../core/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../core/errors/resource-not-found-error");
const read_notification_1 = require("../../../domain/notification/application/use-cases/read-notification");
const current_user_decorator_1 = require("../../auth/current-user-decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ReadNotificationController = class ReadNotificationController {
    constructor(readNotification) {
        this.readNotification = readNotification;
    }
    async handler(notificationId, user) {
        const result = await this.readNotification.execute({
            notificationId,
            recipientId: user.sub,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case resource_not_found_error_1.ResourceNotFoundError:
                    throw new common_1.NotFoundException(result.value.message);
                case not_allowed_error_1.NotAllowedError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
    }
};
exports.ReadNotificationController = ReadNotificationController;
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiTags)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization Bearer',
        example: 'Bearer',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Resource Not Found Error',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Not Allowed',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('notificationId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReadNotificationController.prototype, "handler", null);
exports.ReadNotificationController = ReadNotificationController = __decorate([
    (0, common_1.Controller)('/notifications/:notificationId/read'),
    __metadata("design:paramtypes", [read_notification_1.ReadNotificationUseCase])
], ReadNotificationController);
//# sourceMappingURL=read-notification.controller.js.map