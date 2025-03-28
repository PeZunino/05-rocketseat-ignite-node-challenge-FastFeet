import { UserEntity } from '@/core/entities/abstract-user.entity';

export interface UsersRepository{
	findByEmail(email:string):Promise<UserEntity | null>

	findByCPF(cpf:string):Promise<UserEntity | null>
  
	create(user:UserEntity):Promise<void>

}