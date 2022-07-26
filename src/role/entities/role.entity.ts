import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
