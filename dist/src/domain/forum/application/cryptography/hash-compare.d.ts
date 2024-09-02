export declare abstract class HashComparer {
    abstract compare(payload: string, hash: string): Promise<boolean>;
}
