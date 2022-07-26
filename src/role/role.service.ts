import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roles: Repository<RoleEntity>,
  ) {}
  async createRole(CreateRoleDto: CreateRoleDto) {
    const role = this.roles.create(CreateRoleDto);
    return await this.roles.save(role);
  }
  async getRoleByName(name: string) {
    const role = await this.roles.findOne({
      where: {
        role: name,
      },
    });
    if (!role) throw new NotFoundException(`role ${name} not found`);
    return role;
  }
}
