import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, failure, success } from '@/core/either';
import { UserEntityProps } from '@/core/entities/abstract-user.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UsersRepository } from '../repositories/users.repository';

interface ReadUserServiceRequest{
	id:UniqueEntityID
}

export type ReadUserResponseObject = Omit<UserEntityProps, 'password' | 'createdAt'> & {id:UniqueEntityID};

type ReadUserServiceResponse = Either<NotFoundException , ReadUserResponseObject> 

@Injectable()
export class ReadUserService{

	constructor(private usersRepository: UsersRepository){}

	async execute({id}:ReadUserServiceRequest):Promise<ReadUserServiceResponse>{
		const foundUser = await this.usersRepository.findById(id);  

		if(!foundUser){
			return failure(new NotFoundException());
		}

		const {
			cpf,email,name,packages,role,updatedAt
		} = foundUser;

		return success({
			id,
			cpf,
			email,
			name,
			packages,
			role,
			updatedAt
		} as ReadUserResponseObject);
	}

}