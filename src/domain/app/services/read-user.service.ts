import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, failure, success } from '@/core/either';
import { UserEntityProps } from '@/core/entities/abstract-user.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users.repository';

interface ReadUserServiceRequest{
	requiredId:UniqueEntityID
}

export type ReadUserResponseObject = Omit<UserEntityProps, 'password' | 'createdAt'> & {id:UniqueEntityID};

type ReadUserServiceResponse = Either<NotFoundException , ReadUserResponseObject> 

@Injectable()
export class ReadUserService{

	constructor(private usersRepository: PrismaUsersRepository){}

	async execute({requiredId}:ReadUserServiceRequest):Promise<ReadUserServiceResponse>{
		const foundUser = await this.usersRepository.findById(requiredId);  

		if(!foundUser){
			return failure(new NotFoundException());
		}

		const {
			cpf,email,name,role,updatedAt,createdAt,id,packages
		} = foundUser;

		return success({
			cpf,
			email,
			name,
			role,
			updatedAt,
			createdAt,
			id,
			packages
		} as ReadUserResponseObject);
	}

}