import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {

    constructor(
      
        @InjectRepository(RoleEntity)
      private readonly roles: Repository<RoleEntity>
      
      ) {}
    async createRole(CreateRoleDto:CreateRoleDto){
        const role = this.roles.create(CreateRoleDto)
       return await this.roles.save(role)
    }


    async getRoleByValue(roles : string){
      const role = 
         await this.roles.findOne({
        where: {
              role: roles,       
            },
          });
          if (!role) throw new NotFoundException(`role ${roles} not found`); 
          return role
    }
}
declare interface IFindParams {
  roles: string;
}
