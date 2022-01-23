import { EntityRepository, Repository } from 'typeorm';
import { UserDetail } from '../entities';

// Repository 패턴을 이용해 DB와 연동
@EntityRepository(UserDetail)
export class UserDetailRepository extends Repository<UserDetail> {
  // user Detail 등록
  // Pick<T, P> T에서 Property P를 선택한 Type을 구성
  async createUserDetail(userDetail: Pick<UserDetail, 'description'>) {
    return await this.createQueryBuilder().insert().into(UserDetail).values(userDetail).execute();
  }

  // user Detail 조회
  async findUserDetail(timezone: string, optional?: { id?: number; uid?: string }) {
    let statement = `
    SELECT
      DESCRIPTION description,
      UD.INSERT_ID insertId,
      CONVERT_TZ(UD.INSERT_DT, 'UTC', '${timezone}') insertDt, 
      UD.UPDATE_ID updateId,
      CONVERT_TZ(UD.UPDATE_DT, 'UTC', '${timezone}') updateDt
    FROM user_detail UD
      INNER JOIN user U ON U.ID = UD.ID
    WHERE UD.`;

    const { id, uid } = optional;

    if (id) {
      statement += `ID = ?`;
      return await this.query(statement, [id]);
    } else if (uid) {
      statement += `INSERT_ID = ?`;
      return await this.query(statement, [uid]);
    }
  }
}
