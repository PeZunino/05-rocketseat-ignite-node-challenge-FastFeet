
import { CanActivate, ExecutionContext,ForbiddenException,Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPayload } from './jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {

	constructor(private reflector: Reflector){}

	canActivate(context: ExecutionContext){
		const requiredRole = this.reflector.get('role',context.getHandler());

		const user = context.switchToHttp()
			.getRequest().user as UserPayload;

		console.log(requiredRole);

		console.log(user.role);

		if(requiredRole != user.role){
			throw new ForbiddenException('Unauthorized');
		}

		return true;
	}
}
