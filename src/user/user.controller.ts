import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnums } from 'src/common/enums/roles.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Roles(RolesEnums.developer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:email')
  async myProfile(@Param('email') email: string) {
    return this.userService.getUserbyEmail(email)
  }


}
