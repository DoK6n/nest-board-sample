import { Injectable } from '@nestjs/common';
import { UserRepository } from 'users/repositories';
import { CreateBoardRequestDto } from './dto';
import { BoardRepository } from './repositories';

@Injectable()
export class BoardsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  async createBoard(board: CreateBoardRequestDto, uid: string) {
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
}
