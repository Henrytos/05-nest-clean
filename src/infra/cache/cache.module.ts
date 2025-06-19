import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { CacheService } from "./cache.service";
import { CacheRepository } from "./cache-repository";
import { RedisCacheRepository } from "./redis-cache-repository";
import { EnvService } from "../env/env.service";

@Module({
  imports: [
    EnvModule
  ],
  providers:[
    EnvService,
    CacheService,
    {
        provide: CacheRepository,
        useClass: RedisCacheRepository
    }
  ],
  exports:[
    CacheRepository
  ]
})
export class CacheModule {}