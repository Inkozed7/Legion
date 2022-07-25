import { Module,forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
      forwardRef(()=>AuthModule),
  ],
  exports:[
    UserService, 
   ]
})
export class UserModule {}
