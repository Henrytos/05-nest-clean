export declare abstract class CacheRepository {
    abstract get(key: string): Promise<string>;
    abstract set(key: string, value: string): Promise<void>;
    abstract delete(key: string): Promise<void>;
}
