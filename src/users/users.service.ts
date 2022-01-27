import { UserRepository, UserDetailRepository } from './repositories';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'common';
import copy from 'fast-copy'; // 객체 깊은 복사 라이브러리
import { Connection } from 'typeorm';
import { CreateUserInfoRequestDto, UpdateUserInfoRequestDto } from './dto';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UserRepository,
    private readonly userDetailRepository: UserDetailRepository,
    private readonly logger: LoggerService,
  ) {}

  async createUser(createUserInfo: CreateUserInfoRequestDto) {
    // queryRunner는 commit, rollback, release의 transaction 상태를 수동으로 제어가능
    // typeorm-transactional-cls-hooked, connection.manager.transaction, transaction decorator등 다양한 방법이 존재
    const queryRunner = await this.connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      // transaction내에서 처리할 Custom Repository
      const userRepo = queryRunner.manager.getCustomRepository(UserRepository);
      const userDetailRepo = queryRunner.manager.getCustomRepository(UserDetailRepository);

      const user = copy(createUserInfo);
      delete user.description;
      const uid = uuidv1();

      const userDetail = copy(createUserInfo);
      delete userDetail.age;
      delete userDetail.name;

      user['insertId'] = uid;

      // 삽입시 return type인 InsertResult는 generatedMaps, identifiers, raw 객체를 반환하므로 삽입된 id값을 얻을 수 있음
      const id: number = (await userRepo.createUser(user)).identifiers[0].id;

      userDetail['id'] = id;
      userDetail['insertId'] = uid;

      await userDetailRepo.createUserDetail(userDetail);

      // commit transaction
      await queryRunner.commitTransaction();
      return { status: 'success', message: 'user & detail 생성 성공', id: id };
    } catch (error) {
      // 에러로 인해 변경사항을 롤백
      await queryRunner.rollbackTransaction();
      return { status: 'error', message: error.message };
    } finally {
      // 수동으로 생성된 queryRunner 해제
      await queryRunner.release();
    }
  }

  // 특정 id로 user 조회
  async findUserInfo(id: number, tz: string) {
    const userInfo = await this.userRepository.findUser(tz, { id });
    const userDetailInfo = await this.userDetailRepository.findUserDetail(tz, { id });
    if (userInfo.length !== 0) {
      const result = userInfo[0];
      if (userDetailInfo.length !== 0) result.detail = userDetailInfo[0];
      return result;
    } else {
      return {};
    }
  }

  // header의 uid로 내 user 조회
  async findMyInfo(uid: string, tz: string) {
    const userInfo = await this.userRepository.findUser(tz, { uid });
    const userDetailInfo = await this.userDetailRepository.findUserDetail(tz, { uid });
    if (userInfo.length !== 0) {
      const result = userInfo[0];
      if (userDetailInfo.length !== 0) result.detail = userDetailInfo[0];
      return result;
    } else {
      return {};
    }
  }

  // 유저 정보 수정
  async updateUserInfo(id: number, uid: string, userInfo: UpdateUserInfoRequestDto) {
    const queryRunner = await this.connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const userRepo = queryRunner.manager.getCustomRepository(UserRepository);
      const userDetailRepo = queryRunner.manager.getCustomRepository(UserDetailRepository);

      const user = copy(userInfo);
      delete user.description;

      const userDetail = copy(userInfo);
      delete userDetail.age;
      delete userDetail.name;

      await userRepo.updateUser(id, uid, user);
      await userDetailRepo.updateUserDetail(id, uid, userDetail);

      await queryRunner.commitTransaction();
      return { status: 'success', message: '내 정보 수정 성공' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { status: 'error', message: error.message };
    } finally {
      await queryRunner.release();
    }
  }
}
