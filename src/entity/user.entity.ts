import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  id: string;

  @Column()
  pw: string;

  @Column()
  memberShip: string;

  @CreateDateColumn()
  regDate: Date;
}
