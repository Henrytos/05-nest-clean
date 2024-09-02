import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';
import { HashComparer } from '@/domain/forum/application/cryptography/hash-compare';
export declare class BcryptHasher implements HashGenerator, HashComparer {
    private HASH_SALT_LENGTH;
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
