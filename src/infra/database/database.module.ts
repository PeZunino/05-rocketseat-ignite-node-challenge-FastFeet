import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
	providers:[ //* DENTRODO MODULO
		PrismaService,
		PrismaUsersRepository
	],
	exports:[ //* FORA DO MODULO
		PrismaService,
		PrismaUsersRepository
		
	]
})
export class DatabaseModule{}