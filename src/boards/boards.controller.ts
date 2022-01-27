import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UidGuard } from 'auth';
import { ClientTimezone } from 'common';
import { UserUid } from 'users/decorators';
import { BoardsService } from './boards.service';
import {
  CreateBoardRequestDto,
  CreateBoardResponseDto,
  DeleteBoardResponseDto,
  FindBoardResponseDto,
  FindBoardsListResponseDto,
  UpdateBoardRequestDto,
  UpdateBoardResponseDto,
} from './dto';
import { BoardParamValidationPipe } from './pipes';

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
    @Body() dto: CreateBoardRequestDto,
  ): Promise<CreateBoardResponseDto> {
    return this.boardsService.createBoard(dto, uid);
  }

  @ApiOperation({
    summary: '전체 게시글 조회 페이징',
    description: '전체 게시글들을 페이지별로 조회합니다',
  })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'page',
    required: true,
    example: 1,
  })
  @ApiOkResponse({ type: FindBoardsListResponseDto })
  @Get('/find/list/:page')
  async retrieveBoardsList(
    @ClientTimezone() tz: string,
    @Param('page', BoardParamValidationPipe) page: number,
  ): Promise<FindBoardsListResponseDto> {
    return this.boardsService.findBoardsList(page, tz);
  }

  @ApiOperation({ summary: '특정 게시글 조회', description: '특정 게시글만 조회합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  @Get('/find/:id')
  @ApiOkResponse({ type: FindBoardResponseDto })
  async retrieveBoard(
    @ClientTimezone() tz: string,
    @Param('id', BoardParamValidationPipe) id: number,
  ): Promise<FindBoardResponseDto> {
    return this.boardsService.findBoard(id, tz);
  }

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '특정 게시글 수정', description: '특정 게시글을 수정합니다' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  @ApiOkResponse({ type: UpdateBoardResponseDto })
  @Patch('/update/:id')
  async editBoard(
    @UserUid() uid: string,
    @Param('id', BoardParamValidationPipe) id: number,
    @Body() dto: UpdateBoardRequestDto,
  ): Promise<UpdateBoardResponseDto> {
    return this.boardsService.updateBoard(id, dto, uid);
  }

  @UseGuards(UidGuard)
  @ApiOperation({ summary: '특정 게시글 삭제', description: '특정 게시글을 삭제합니다.' })
  @ApiSecurity({ timezone: [], uid: [] })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1
  })
  @ApiOkResponse({ type: DeleteBoardResponseDto })
  @Delete('/delete/:id')
  async removeBoard(
    @Param('id') id: number,
  ): Promise<DeleteBoardResponseDto> {
    return this.boardsService.deleteBoard(id);
  }
}
