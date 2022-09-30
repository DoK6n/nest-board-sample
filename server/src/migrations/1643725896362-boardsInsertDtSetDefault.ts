import { MigrationInterface, QueryRunner } from 'typeorm';

export class boardsInsertDtSetDefault1643725896362 implements MigrationInterface {
  name = 'boardsInsertDtSetDefault1643725896362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      /*sql*/ `alter table USER_BOARD modify INSERT_DT datetime default CURRENT_TIMESTAMP not null comment '등록일시'`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/*sql*/ `alter table USER_BOARD modify INSERT_DT datetime null`);
  }
}
