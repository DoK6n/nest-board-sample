import { UserDetail } from './userDetail.entity';
import { Board } from 'boards/entities/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'root', name: 'USER' })
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'NAME', comment: '이름', length: 200 })
  name: string;

  @Column('int', { name: 'AGE', comment: '나이' })
  age: number;

  @Column('varchar', { name: 'INSERT_ID', comment: '유저아이디', nullable: true, length: 200 })
  insertId: string | null;

  @Column('datetime', {
    name: 'INSERT_DT',
    comment: '등록일자',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  insertDt: Date | null;

  @Column('varchar', { name: 'UPDATE_ID', comment: '수정자', nullable: true, length: 200 })
  updateId: string | null;

  @Column('datetime', { name: 'UPDATE_DT', comment: '수정일자', nullable: true })
  updateDt: Date | null;

  @OneToMany(() => Board, (UserBoard: Board) => UserBoard.userId)
  userBoard: Board[];

  @OneToMany(() => UserDetail, (userDetail: UserDetail) => userDetail.id)
  userDetail: UserDetail[];
}
