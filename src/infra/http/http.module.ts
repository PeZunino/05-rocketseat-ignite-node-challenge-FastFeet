import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controller/authenticate.controller';
import { CreateUserController } from './controller/create-user.controller';

@Module({
	imports:[
		DatabaseModule
	],
	controllers: [
		CreateUserController,
		AuthenticateController
	]
})
export class HttpModule{}