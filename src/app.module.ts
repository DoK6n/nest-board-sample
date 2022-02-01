import { Module, Controller } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { ConfigModule } from 'nestjs-config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter, LoggerModule, LoggingInterceptor } from 'common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { ApplicationAuthGuard } from 'auth';
import path from 'path';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    // .env를 애플리케이선 전역에서 사용하기 위함
    // ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'), {
      path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
    }),
    DatabaseModule,
    LoggerModule,
    UsersModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApplicationAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {}
}
