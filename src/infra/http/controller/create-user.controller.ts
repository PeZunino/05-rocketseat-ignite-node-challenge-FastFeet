import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { Role } from '@/core/entities/role.enum';
import { CreateUserService } from '@/domain/app/services/create-user.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';


const createUserBodySchema = z.object({
	cpf: z.string()
		.length(11),
	name: z.string(),
	email: z.string()
		.email(),
	password: z.string(),
	role: z.nativeEnum(Role),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class CreateUserController{

	constructor(private createUserService: CreateUserService){}

	@Post()
	@UsePipes(new ZodValidationPipe(createUserBodySchema))
	async handle(@Body() body:CreateUserBodySchema){
		const {
			cpf,email,name,password,role
		} = body;

		await this.createUserService.execute({
			cpf,
			email,
			name,
			password,
			role: role as Role
		});

	}
}