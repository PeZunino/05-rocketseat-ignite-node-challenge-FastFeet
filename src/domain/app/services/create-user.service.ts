import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Either, failure, success } from '@/core/either';
import { UserEntity } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserFactory } from '@/core/entities/user-entity-fabric';
import { UsersRepository } from '../repositories/users.repository';

interface CreateUserUseCaseRequest{
	cpf: string,
	email: string,
	name:string,
	password:string,
	role:Role,
	packages: UniqueEntityID[]
}


type CreateUserUseCaseResponse = Either<ConflictException,{
	user:UserEntity
}>

@Injectable()
export class CreateUserUseCase{
	constructor(private usersRepository:UsersRepository){}

	async execute({
		cpf,email,name,password,role,packages
	}:CreateUserUseCaseRequest):Promise<CreateUserUseCaseResponse>{
    
		const userWithSameCPF = await this.usersRepository.findByCPF(cpf);
    
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
		if(userWithSameCPF){
			return failure(new ConflictException('User with this CPF already exist'));
		}
   
		if(userWithSameEmail){
			return failure(new ConflictException('Email already in use'));
		}

		const hashedPassword = await hash(password, 8);
		
				
		const user = UserFactory.create({
			cpf,
			email,
			name,
			password:hashedPassword,
			role,
			packages
		});
			
		await this.usersRepository.create(user);

		return success({user});
	}

}
