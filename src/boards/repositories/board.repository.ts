import { CreateBoardRequestDto } from 'boards/dto';
import { Board } from 'boards/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(board: CreateBoardRequestDto, userId: number, uid: string) {
    let statement = `INSERT INTO user_board (USER_ID, TITLE, CONTENT, INSERT_ID) VALUE (?, ?, ?, ?)`;
    return await this.query(statement, [userId, board.title, board.content, uid]);
  }
}
