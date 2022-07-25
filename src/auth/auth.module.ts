import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import {JwtModule} from '@nestjs/jwt'
require("dotenv").config();
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[forwardRef(()=>UserModule) ,
  JwtModule.register({
    secret : process.env.Private_Key,
    signOptions:{
      expiresIn: '24h'
    }
  })],
    exports: [
      AuthService,
      JwtModule
    ]
})
export class AuthModule {}
