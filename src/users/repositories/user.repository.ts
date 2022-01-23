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
    let statement = `SELECT ID FROM user WHERE INSERT_ID = ?`;
    return await this.query(statement, [uid]);
  }
}
