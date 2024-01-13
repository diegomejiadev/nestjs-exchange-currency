import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        // url: 'redis://default:6fsIDfdmXMBABxD4qt2I6AhsQIYHpmUm@redis-15708.c266.us-east-1-3.ec2.cloud.redislabs.com:15708',
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [RedisModule],
})
export class RedisLocalModule {}
