import { AuthModule } from './auth.module';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, CurrencyModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
