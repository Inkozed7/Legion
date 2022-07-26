import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async authUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.loginUser(LoginUserDto);
  }

  @Post('/registration')
  async regUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registration(CreateUserDto);
  }
}
