import { EntityRepository, Repository } from 'typeorm';
import { UserDetail } from '../entities';

// Repository 패턴을 이용해 DB와 연동
@EntityRepository(UserDetail)
export class UserDetailRepository extends Repository<UserDetail> {
  // user Detail 등록
  // Pick<T, P> T에서 Property P를 선택한 Type을 구성
  async createUserDetail(userDetail: Pick<UserDetail, 'description'>) {
    return await this.createQueryBuilder()
      .insert()
      .into(UserDetail)
      .values(userDetail)
      .execute();
  }

}
