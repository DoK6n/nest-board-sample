import { CreateBoardRequestDto, UpdateBoardRequestDto } from 'boards/dto';
import { Board } from 'boards/entities';
import { camel2snake } from 'common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(board: CreateBoardRequestDto, userId: number, uid: string) {
    let statement = `INSERT INTO user_board (USER_ID, TITLE, CONTENT, INSERT_ID, INSERT_DT) VALUE (?, ?, ?, ?, NOW())`;
    return await this.query(statement, [userId, board.title, board.content, uid]);
  }

  async findBoardByIdOrPage(tz: string, optional: { id?: number; page?: number }) {
    const { id, page } = optional;

    let statement = `
    SELECT
      UB.ID id,
      UB.TITLE title,
      UB.CONTENT content,
      UB.INSERT_ID insertId,
      CONVERT_TZ(UB.INSERT_DT, 'UTC', '${tz}') insertDt, 
      UB.UPDATE_ID updateId,
      CONVERT_TZ(UB.UPDATE_DT, 'UTC', '${tz}') updateDt
    FROM user_board UB `;

    if (page && !id) {
      statement += `ORDER BY UB.ID DESC LIMIT ?, ?`;
      const MAX_PAGE_LIMIT = 5;
      const first = (page - 1) * MAX_PAGE_LIMIT;
      const last = MAX_PAGE_LIMIT;

      return await this.query(statement, [first, last]);
    } else if (id && !page) {
      statement += `WHERE UB.ID = ?`;

      return await this.query(statement, [id]);
    }
  }

  async updateBoardById(id: number, board: UpdateBoardRequestDto, uid: string) {
    let statement = `UPDATE user_board UB SET `;

    if (Object.keys(board).length !== 0) {
      statement +=
        Object.keys(board)
          .map(col => `UB.${camel2snake(col)} = ?`)
          .join(', ') + ', ';
    }
    statement += `UB.UPDATE_ID = ?, UB.UPDATE_DT = NOW() WHERE UB.ID = ?`;

    const values = Object.values(board);
    values.push(uid);
    values.push(id);

    return await this.query(statement, values);
  }
}
