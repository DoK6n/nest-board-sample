import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Index('FK_USER_DETAIL_USER_ID', ['id'], {})
@Entity({ schema: 'root', name: 'USER_DETAIL' })
export class UserDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID', comment: '유저고유아이디' })
  id: number;

  @Column('text', { name: 'DESCRIPTION', comment: '자기소개', nullable: true })
  description: string | null;

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

  @ManyToOne(() => User, (user: User) => user.userDetail, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'ID', referencedColumnName: 'id' }])
  user: User;
}
