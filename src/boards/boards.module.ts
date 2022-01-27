import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { UserRepository } from 'users/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'common';
import { BoardRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository, UserRepository])],
  controllers: [BoardsController],
  providers: [BoardsService, LoggerService],
  exports: [TypeOrmModule, BoardsService],
})
export class BoardsModule {}
