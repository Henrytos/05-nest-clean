"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const env_service_1 = require("../env/env.service");
const env_module_1 = require("../env/env.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [env_module_1.EnvModule],
                inject: [env_service_1.EnvService],
                global: true,
                useFactory(envService) {
                    const privateKey = envService.get('JWT_PRIVATE_KEY');
                    const publicKey = envService.get('JWT_PUBLIC_KEY');
                    return {
                        signOptions: { algorithm: 'RS256' },
                        privateKey: Buffer.from(privateKey, 'base64'),
                        publicKey: Buffer.from(publicKey, 'base64'),
                    };
                },
            }),
        ],
        providers: [
            jwt_strategy_1.AuthStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            env_service_1.EnvService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map