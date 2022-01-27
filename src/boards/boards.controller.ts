import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UidGuard } from 'auth';
import { UserUid } from 'users/decorators';
import { BoardsService } from './boards.service';
import { CreateBoardRequestDto, CreateBoardResponseDto } from './dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '게시글 생성', description: '새 게시글을 작성합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiBody({ type: CreateBoardRequestDto })
  @ApiOkResponse({ type: CreateBoardResponseDto })
  @Post('/create')
  async addBoard(
    @UserUid() uid: string,
    @Body() dto: CreateBoardRequestDto
  ): Promise<CreateBoardResponseDto> {
    return this.boardsService.createBoard(dto, uid);
  }
}