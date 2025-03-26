import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';
import { Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';


const createUserBodySchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string()
		.email(),
	password: z.string(),
	role: z.nativeEnum(Role),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class CreateUserController{

	constructor(private prisma: PrismaService){}

	@Post()
	@UsePipes(new ZodValidationPipe(createUserBodySchema))
	async handle(@Body() body:CreateUserBodySchema){

		const {
			cpf,email,name,password,role
		} = body;

		const userWithSameCPF = await this.prisma.user.findUnique({where:{cpf}});

		const userWithSameEmail = await this.prisma.user.findUnique({where:{email}});

		if(userWithSameCPF){
			throw new ConflictException('User with this CPF already exist');
		}

		if(userWithSameEmail){
			throw new ConflictException('Email already in use');
		}

		const hashedPassword = await hash(password, 8);

		await this.prisma.user.create({
			data:{
				cpf,
				name,
				password:hashedPassword,
				role,
				email
			}
		});
	}
}