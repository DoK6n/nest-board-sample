import { User } from './../../users/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Index('FK_USER_BOARD_USER_ID', ['userId'], {})
@Entity('USER_BOARD', { schema: 'root' })
export class Board {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'USER_ID' })
  userId: number;

  @Column('varchar', { name: 'TITLE', comment: '글제목', length: 256 })
  title: string;

  @Column('text', { name: 'CONTENT', nullable: true, comment: '글내용' })
  content: string | null;

  @Column('varchar', {
    name: 'INSERT_ID',
    nullable: true,
    comment: '등록자',
    length: 256,
  })
  insertId: string | null;

  @Column('datetime', {
    name: 'INSERT_DT',
    nullable: true,
    comment: '등록일시',
  })
  insertDt: Date | null;

  @Column('varchar', {
    name: 'UPDATE_ID',
    nullable: true,
    comment: '수정자',
    length: 256,
  })
  updateId: string | null;

  @Column('datetime', {
    name: 'UPDATE_DT',
    nullable: true,
    comment: '수정일시',
  })
  updateDt: Date | null;

  @ManyToOne(() => User, (User: User) => User.userBoard, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'USER_ID', referencedColumnName: 'id' }])
  user: User;
}
