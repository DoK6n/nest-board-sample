import { Injectable } from '@nestjs/common';
import { UserRepository } from 'users/repositories';
import { CreateBoardRequestDto, CreateBoardResponseDto, UpdateBoardRequestDto } from './dto';
import { BoardRepository } from './repositories';

@Injectable()
export class BoardsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  async createBoard(board: CreateBoardRequestDto, uid: string): Promise<CreateBoardResponseDto> {
    const userId = (await this.userRepository.findUserIdByInsertId(uid))[0].ID;
    const createdBoardId = await this.boardRepository.createBoard(board, userId, uid);
    // FIXME Interceptor로 response mapping 필요
    const response = {
      status: 'success',
      message: '게시글 등록 성공',
      data: { writer: userId, boardNum: createdBoardId.insertId },
    };
    return response;
  }

  async findBoardsList(page: number, tz: string) {
    return await this.boardRepository.findBoardByIdOrPage(tz, { page });
  }

  async findBoard(id: number, tz: string) {
    return await this.boardRepository.findBoardByIdOrPage(tz, { id });
  }

  async updateBoard(id: number, dto: UpdateBoardRequestDto, uid: string) {
    await this.boardRepository.updateBoardById(id, dto, uid);
    const response = { status: 'success', message: `게시글 수정 성공`, data: { boardNum: id } };
    return response;
  }
}
