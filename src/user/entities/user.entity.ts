import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsString, isString } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RolesEnums } from 'src/common/enums/roles.enums';
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    email : string;

    @Column()
    password : string;

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
     
    @OneToMany(() => RoleEntity,(role) => role.user)
    @JoinTable()
    roles: RoleEntity[]
    
    
    
    @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

}
