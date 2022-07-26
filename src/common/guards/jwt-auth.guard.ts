import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class JwtAuthGuard implements CanActivate {

	constructor(private jwtService: JwtService) {

	}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const req = context.switchToHttp().getRequest()

			const authHeader = req.headers.Authorization || req.headers.authorization;
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException('Access denied');
			}
			const user = this.jwtService.verify(token);
			return true
		}
		catch (e) {

			throw new UnauthorizedException('Access denied_JWT');
		}
	}
}