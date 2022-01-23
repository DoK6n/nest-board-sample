import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { ClientTimezone } from 'common/decorators';
import { UidGuard } from 'auth/guards';
import { CreateUserInfoRequestDto, CreateUserInfoResponseDto, UserInfoResponseDto } from './dto';
import { UserUid } from './decorators';
import { UserParamValidationPipe } from './pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User 및 Detail 생성', description: '새 User을 생성합니다' })
  @ApiOkResponse({ type: CreateUserInfoResponseDto })
  @Post('/create')
  async addUser(@Body() dto: CreateUserInfoRequestDto): Promise<CreateUserInfoResponseDto> {
    return this.usersService.createUser(dto);
  }

  // @UseGuards(UidGuard)
  @ApiOperation({ summary: '특정 User & Detail 조회', description: '특정 유저 정보를 조회합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiOkResponse({ description: '조회성공', type: UserInfoResponseDto })
  @Get('/find/:id')
  async retrieveSample(
    @Param('id', UserParamValidationPipe) id: number,
    @ClientTimezone() tz: string,
  ): Promise<UserInfoResponseDto> {
    return this.usersService.findUser(id, tz);
  }

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '내 User & Detail 조회', description: '내 정보를 조회합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiOkResponse({ description: '조회성공', type: UserInfoResponseDto })
  @Get('/find')
  async retrieveMySample(
    @ClientTimezone() tz: string,
    @UserUid() uid: string,
  ): Promise<UserInfoResponseDto> {
    return this.usersService.findMyUser(uid, tz);
  }
}
