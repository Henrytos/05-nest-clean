import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    JWT_PRIVATE_KEY: z.ZodString;
    JWT_PUBLIC_KEY: z.ZodString;
    CLOUDFLARE_ACCOUNT_ID: z.ZodString;
    AWS_BUCKET_NAME: z.ZodString;
    AWS_ACCESS_KEY_ID: z.ZodString;
    AWS_SECRET_ACCESS_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_PRIVATE_KEY?: string;
    JWT_PUBLIC_KEY?: string;
    CLOUDFLARE_ACCOUNT_ID?: string;
    AWS_BUCKET_NAME?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
}, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_PRIVATE_KEY?: string;
    JWT_PUBLIC_KEY?: string;
    CLOUDFLARE_ACCOUNT_ID?: string;
    AWS_BUCKET_NAME?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
}>;
export type Env = z.infer<typeof envSchema>;
