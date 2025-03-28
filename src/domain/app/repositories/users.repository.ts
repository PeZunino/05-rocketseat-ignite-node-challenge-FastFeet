import { UserEntity } from '@/core/entities/abstract-user.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

export interface UsersRepository{
	findByEmail(email:string):Promise<UserEntity | null>

	findByCPF(cpf:string):Promise<UserEntity | null>
  
	findById(id:UniqueEntityID):Promise<UserEntity | null>

	create(user:UserEntity):Promise<void>

}