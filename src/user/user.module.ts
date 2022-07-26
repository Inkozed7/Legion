import { Module, forwardRef, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';
@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => RoleModule),
  ],
})
export class UserModule {}
