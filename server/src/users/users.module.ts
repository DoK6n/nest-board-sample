import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDetailRepository, UserRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'common';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserDetailRepository])],
  controllers: [UsersController],
  providers: [UsersService, LoggerService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
