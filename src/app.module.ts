import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserController } from './controller/create-user.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal:true
		})
	],
	controllers: [
		CreateUserController
	],
	providers: [
		PrismaService
	],
})
export class AppModule {}
