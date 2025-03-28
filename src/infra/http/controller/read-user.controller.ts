import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { ReadUserService } from '@/domain/app/services/read-user.service';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { Roles } from '@/infra/auth/role.decorator';
import { RolesGuard } from '@/infra/auth/role.guard';

@Controller('/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReadUserController{

	constructor(private readUserService: ReadUserService){}
	
	@Get()
	@Roles('ADMIN')
	@HttpCode(200)
	async handle(@CurrentUser() user: UserPayload){
		const response = await this.readUserService.execute({requiredId: new UniqueEntityID(user.sub)});

		return response.value;
	}
}