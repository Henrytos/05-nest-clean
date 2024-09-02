import { Strategy } from 'passport-jwt';
import { z } from 'zod';
import { EnvService } from '../env/env.service';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sub?: string;
}, {
    sub?: string;
}>;
export type UserPayload = z.infer<typeof tokenPayloadSchema>;
declare const AuthStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class AuthStrategy extends AuthStrategy_base {
    constructor(envService: EnvService);
    validate(payload: UserPayload): Promise<{
        sub?: string;
    }>;
}
export {};
