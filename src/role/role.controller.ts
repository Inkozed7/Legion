import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}


  @Post('/create')
  async createRole(@Body() createRoleDto : CreateRoleDto)
  {
     return this.roleService.createRole(createRoleDto)
  }

  @Get('/:value')
  async getRoleByValue(@Param('value') value : string)
  {  
     return this.roleService.getRoleByValue(value)
  }
}
