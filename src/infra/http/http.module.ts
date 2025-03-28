import { Module } from '@nestjs/common';
import { CreateUserService } from '@/domain/app/services/create-user.service';
import { ReadUserService } from '@/domain/app/services/read-user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controller/authenticate.controller';
import { CreateUserController } from './controller/create-user.controller';
import { ReadUserController } from './controller/read-user.controller';

@Module({
	imports:[
		DatabaseModule
	],
	controllers: [
		CreateUserController,
		ReadUserController,
		AuthenticateController
	],
	providers:[
		CreateUserService,
		ReadUserService
	]
})
export class HttpModule{}