import { Controller, Post, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { ClientTimezone } from 'common/decorators';
import { UidGuard } from 'auth/guards';
import { CreateUserInfoRequestDto, CreateUserInfoResponseDto, UpdateUserInfoRequestDto, UpdateUserInfoResponseDto, UserInfoResponseDto } from './dto';
import { UserUid } from './decorators';
import { UserParamValidationPipe } from './pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '신규 유저 생성', description: '신규 유저 생성합니다' })
  @ApiOkResponse({ type: CreateUserInfoResponseDto })
  @Post('/create')
  async addUser(@Body() dto: CreateUserInfoRequestDto): Promise<CreateUserInfoResponseDto> {
    return this.usersService.createUser(dto);
  }

  // @UseGuards(UidGuard)
  @ApiOperation({ summary: '특정 유저 정보 조회', description: '특정 유저 정보를 조회합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiOkResponse({ description: '조회성공', type: UserInfoResponseDto })
  @Get('/find/:id')
  async retrieveUserInfo(
    @Param('id', UserParamValidationPipe) id: number,
    @ClientTimezone() tz: string,
  ): Promise<UserInfoResponseDto> {
    return this.usersService.findUserInfo(id, tz);
  }

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '내 정보 조회', description: '내 정보를 조회합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiOkResponse({ description: '조회성공', type: UserInfoResponseDto })
  @Get('/find')
  async retrieveMyInfo(
    @ClientTimezone() tz: string,
    @UserUid() uid: string,
  ): Promise<UserInfoResponseDto> {
    return this.usersService.findMyInfo(uid, tz);
  }

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '내 정보 수정', description: '내 정보를 수정합니다.' })
  @ApiBody({ type: UpdateUserInfoRequestDto })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1
  })
  @ApiOkResponse({ description: '수정성공', type: UpdateUserInfoResponseDto })
  @Patch('/update/:id')
  async editUserInfo(
    @Param('id', UserParamValidationPipe) id: number,
    @UserUid() uid: string,
    @Body() dto: UpdateUserInfoRequestDto
  ): Promise<UpdateUserInfoResponseDto> {
    return this.usersService.updateUserInfo(id, uid, dto);
  }
}
