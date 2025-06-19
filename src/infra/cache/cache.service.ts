import { OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { EnvService } from '../env/env.service';

export class CacheService extends Redis implements OnModuleInit  {
    
    constructor(envService: EnvService) {
        super({
            host: envService.get('REDIS_HOST'),
            port: envService.get('REDIS_PORT'),
            db: envService.get('REDIS_DB'),
        });
    }
    
    onModuleInit() {
        throw new Error('Method not implemented.');
    }
}