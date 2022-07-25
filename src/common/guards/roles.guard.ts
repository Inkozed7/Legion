/*
https://docs.nestjs.com/guards#guards
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly users: Repository<UserEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.Authorization || req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new ForbiddenException('Access denied permission');
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      const roles = await this.getRoleByEmail(req.user.email);
      return roles.some((role) => requiredRoles.includes(role));
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Access denied');
    }
  }

  async getRoleByEmail(email: string) {
    const user = await this.users.findOne({
      where: { email: email },
      relations: { roles: true },
    });
    return (await user).roles.map((i) => i.role);
  }
}
