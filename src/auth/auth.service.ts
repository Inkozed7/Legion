import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-User.dto';
import { LoginUserDto } from '../user/dto/login-User.dto';
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwtService: JwtService
  ) { }


  async loginUser(LoginUserDto: LoginUserDto) {
    const user = this.validateUser(LoginUserDto)
    const token = await this.generateToken(await user)

    return [{
      AccessToken: token,
      userName: (await user).firstName,
      userPhone: (await user).phoneNumber
    }]
  }
  async validateUser(LoginUserDto: LoginUserDto) {

    const user = await this.users.findByParam({ email: LoginUserDto.email })
    if (!user) throw new UnauthorizedException('User not found');

    const pwdhash = await bcrypt.compare(LoginUserDto.password, (await user).password)
    if (!pwdhash) throw new UnauthorizedException('invalid username or password');

    return user;
  }

  async registration(CreateUserDto: CreateUserDto) {
    //console.log(CreateUserDto.email)
    const candidate = await this.users.getUserbyEmail(CreateUserDto.email)
    if (candidate) throw new HttpException("User has been registred", HttpStatus.BAD_REQUEST)
    const user = await this.users.createUser(CreateUserDto)
    return [{ token: this.generateToken(user) }]
  }
  async generateToken(users: UserEntity,) {
    const payload = { email: users.email, id: users.id, role: await this.users.getRolebyEmail(users.email) }
    return this.jwtService.sign(payload)
  }
} 
