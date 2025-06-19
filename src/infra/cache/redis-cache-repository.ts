import { Injectable } from "@nestjs/common";
import { CacheRepository } from "./cache-repository";
import { CacheService } from "./cache.service";


@Injectable()
export class RedisCacheRepository implements CacheRepository {
    constructor(private cache: CacheService){}
    
    async get(key: string) {;
       return  this.cache.get(key)    
    }

    async set(key: string, value: string): Promise<void> {
        await this.cache.set(key, value, "EX", 60 * 15); // 15 minutes expiration
    }
    async delete(key: string) {
        await this.cache.del(key);
    }
}