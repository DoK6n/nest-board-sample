import { OrmConfigService } from './../config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';

import { LoggerModule, TypeOrmExceptionFilter } from '../common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 저장소 모듈 옵션을 비동기식으로 전달
      imports: [ConfigModule],
      useClass: OrmConfigService, // DB접속정보가 담긴 class를 인스턴스화 하여 createTypeOrmOptions()를 호출하여 옵션을 적용
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class DatabaseModule {}
