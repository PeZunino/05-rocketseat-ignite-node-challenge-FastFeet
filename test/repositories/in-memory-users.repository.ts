import { UserEntity } from '@/core/entities/abstract-user.entity';
import { UsersRepository } from '@/domain/app/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository{
	public items: UserEntity[] = [];
  
	async findByEmail(email: string): Promise<UserEntity | null> {
		return this.items.find(item=>item.email == email) ?? null;
	}
  
	async findByCPF(cpf: string): Promise<UserEntity | null> {
		return this.items.find(item=>item.cpf == cpf) ?? null;
	}
  
	async create(user: UserEntity): Promise<void> {
		this.items.push(user);

		return; 
	}

}