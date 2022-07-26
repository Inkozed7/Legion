import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/role/entities/role.entity';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  companyName: string;

  @Column()
  city: string;

  @Column()
  phoneNumber: string;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable()
  roles: RoleEntity[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
