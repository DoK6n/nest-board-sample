import { camel2snake } from 'common';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserInfoRequestDto } from 'users/dto';
import { User } from '../entities';

// Repository 패턴을 이용해 DB와 연동
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // user 등록
  async createUser(user: Pick<User, 'name' | 'age'>) {
    return await this.createQueryBuilder().insert().into(User).values(user).execute();
  }

  async findUserIdByInsertId(uid: string) {
    let statement = `SELECT U.ID FROM user U WHERE U.INSERT_ID = ?`;
    return await this.query(statement, [uid]);
  }

  // user 조회
  async findUser(timezone: string, optional: { id?: number; uid?: string }) {
    // 매개변수 여러개를 optional로 받아옴
    let statement = /*sql*/ `
    SELECT
      U.NAME name,
      U.AGE age,
      U.INSERT_ID insertId,
      CONVERT_TZ(U.INSERT_DT, 'UTC', '${timezone}') insertDt, 
      U.UPDATE_ID updateId,
      CONVERT_TZ(U.UPDATE_DT, 'UTC', '${timezone}') updateDt
    FROM user U WHERE U.`;

    const { id, uid } = optional;

    if (id && !uid) {
      statement += /*sql*/ `ID = ?`;
      return await this.query(statement, [id]);
    } else if (uid && !id) {
      statement += /*sql*/ `INSERT_ID = ?`;
      return await this.query(statement, [uid]);
    }
  }

  // user 데이터 수정
  // Omit<T, P> T에서 Property P를 제거한 Type을 구성
  async updateUser(id: number, uid: string, user: Omit<UpdateUserInfoRequestDto, 'discription'>) {
    let statement = `UPDATE user U SET `;

    if (Object.keys(user).length !== 0) {
      statement +=
        Object.keys(user)
          .map(col => `U.${camel2snake(col)} = ?`)
          .join(', ') + ', ';
    }
    statement += /*sql*/ `U.UPDATE_ID = ?, U.UPDATE_DT = NOW() WHERE U.ID = ?`;

    const values = Object.values(user);
    values.push(uid);
    values.push(id);

    return await this.query(statement, values);
  }

  // user 데이터 삭제
  async deleteUser(id: number) {
    const statement = `DELETE FROM user WHERE ID = ?`;
    return await this.query(statement, [id]);
  }
}
