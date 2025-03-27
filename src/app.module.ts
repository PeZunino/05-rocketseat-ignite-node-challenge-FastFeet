import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controller/authenticate.controller';
import { CreateUserController } from './controller/create-user.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal:true
		}),
		AuthModule
	],
	controllers: [
		CreateUserController,
		AuthenticateController
	],
	providers: [
		PrismaService
	],
})
export class AppModule {}
