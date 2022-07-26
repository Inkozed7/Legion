import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { RolesEnums } from 'src/common/enums/roles.enums';
import { RoleEntity } from 'src/role/entities/role.entity';
import { AddRoleDto } from './dto/add-Role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly role: RoleService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const user = await this.users.create(createUserDto)
    const roles = await this.role.getRoleByValue(RolesEnums.client)
    user.roles = [roles]
    return this.users.save(user)

  }
  async addRole(AddRoleDto: AddRoleDto) {
    const user = await this.users.findOne({ where: { id: AddRoleDto.idUser } })
    const role = await this.role.getRoleByValue(AddRoleDto.role)
    if (role && user) {
        await this.role.createRole
    }
    return user
  }

  async getUserbyEmail(email: string) {
    // console.log(email);
    const user = await this.users.findOne({ where: { email: email }, relations: { roles: true } })
    if (!user) return null
    return [
      {
        userEmail: user.email,
        userCompany: user.companyName,
        userCity: user.city,
        userPhone: user.phoneNumber,
        userRole: user.roles.map(i => i.role),
      }]
  }

  async getRolebyEmail(email: string) {

    const user = await this.users.findOne({ where: { email: email }, relations: { roles: true } })

    return user.roles.map(i => i.role)

  }


  async findByParam(params: IFindParams) {
    const { email } = params;
    return this.users.findOne({

      where: {
        email: email,
      },
    });
  }


}



declare interface IFindParams {
  email: string;

}
