import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { CacheService } from "./cache.service";

@Module({
  imports: [
    EnvModule
  ]  ,
  providers:[
    CacheService
  ]
})
export class CacheModule {}