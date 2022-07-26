import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { RolesEnums } from 'src/common/enums/roles.enums';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly role: RoleService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = this.users.create(createUserDto) as Partial<UserEntity>;
    const roles = await this.role.getRoleByName(RolesEnums.client);
    user.roles = [roles];
    return await this.users.save(user);
  }
  async addRole(AddRoleDto: AddRoleDto) {
    const user = await this.users.findOne({ where: { id: AddRoleDto.userId } });
    const role = await this.role.getRoleByName(AddRoleDto.roleName);
    if (role && user) {
      user.roles.push(role);
      // await this.users.update({ where: { id: AddRoleDto.userId }}, )
      await this.users.save(user);
      return user;
    }
  }

  async getUserByEmail(email: string) {
    // console.log(email);
    const user = await this.users.findOne({
      where: { email: email },
      relations: { roles: true },
    });
    if (!user) return null;
    return [
      {
        userEmail: user.email,
        userCompany: user.companyName,
        userCity: user.city,
        userPhone: user.phoneNumber,
        userRole: user.roles.map((i) => i.role),
      },
    ];
  }

  async getUserRolesByEmail(email: string) {
    const user = await this.users.findOne({
      where: { email: email },
      relations: { roles: true },
    });

    return user.roles.map((i) => i.role);
  }

  async findByParam(params: IFindParams) {
    const { email } = params;
    return this.users.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number) {
    return this.users.findOne({
      where: {
        id: id,
      },
    });
  }
}

declare interface IFindParams {
  email: string;
}
