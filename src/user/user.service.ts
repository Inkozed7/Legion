import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { RolesEnums } from 'src/common/enums/roles.enums';
import { RoleEntity } from 'src/role/entities/role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly role: RoleService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.users.create(createUserDto)
    const roles = await this.role.getRoleByValue(RolesEnums.client)
    user.roles = [roles]
    return this.users.save(user)

  }

  async getUserbyEmail(email: string) {

    const user = await this.users.findOne({ where: { email: email }, relations: { roles: true } })

    return [
      {
        userEmail: user.email,
        userCompany: user.companyName,
        userCity: user.city,
        userPhone: user.phoneNumber,
        userRole: user.roles.map(i => i.role),
      }]
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
