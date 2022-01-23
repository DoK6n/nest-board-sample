import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClientTimezone } from 'common/decorators';
import { UidGuard } from 'auth/guards';
import { CreateUserInfoRequestDto, CreateUserInfoResponseDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User 및 Detail 생성', description: '새 User을 생성합니다' })
  @ApiOkResponse({ type: CreateUserInfoResponseDto })
  @Post('/create')
  async addUser(@Body() dto: CreateUserInfoRequestDto): Promise<CreateUserInfoResponseDto> {
    return this.usersService.createUser(dto);
  }
}
