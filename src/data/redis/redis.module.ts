import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT!),
          },
        }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
