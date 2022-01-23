import { EntityRepository, Repository } from 'typeorm';
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
    let statement = `
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
      statement += `ID = ?`;
      return await this.query(statement, [id]);
    } else if (uid && !id) {
      statement += `INSERT_ID = ?`;
      return await this.query(statement, [uid]);
    }
  }
}
