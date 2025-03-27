import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';


const authenticateUserBodySchema = z.object({
	cpf: z.string()
		.length(11),
	password: z.string(),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

@Controller('/sessions')
export class AuthenticateController{

	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	){}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
	async handle(@Body() body:AuthenticateUserBodySchema){
		const {
			cpf,password
		} = body;

		const foundUser = await this.prisma.user.findUnique({where:{cpf}});

		if(!foundUser){
			throw new UnauthorizedException('Wrong e-mail password combination');
		}

		const isPasswordValid = compare(password,foundUser.password);

		if(!isPasswordValid){
			throw new UnauthorizedException('Wrong e-mail password combination');
		}

		const token = this.jwt.sign({
			sub: foundUser.id,
			role: foundUser.role
		});

		return{access_token:token};
	}
}