import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private jwtService: JwtService,
    private reflector: Reflector) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if (!requiredRoles) {
        return true
      }
      const req = context.switchToHttp().getRequest()

      const authHeader = req.headers.Authorization || req.headers.authorization;
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Access denied by role');
      }
      const user = this.jwtService.verify(token);
      console.log(user)
      const hasRole = user.role.some(role => requiredRoles.includes(role));
      console.log(hasRole)
      return hasRole
    }
    catch (e) {
      console.log(e)
      throw new UnauthorizedException('Access denied_ROLE');
    }
  }
}