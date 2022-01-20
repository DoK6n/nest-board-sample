import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global() // 글로벌 모듈
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
