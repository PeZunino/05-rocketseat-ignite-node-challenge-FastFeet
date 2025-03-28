import { UserEntity } from '@/core/entities/abstract-user.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserFactory } from '@/core/entities/user-entity-fabric';
import { UsersRepository } from '@/domain/app/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository{
	public items: UserEntity[] = [];
	
	async findById(id: UniqueEntityID): Promise<UserEntity | null> {
		return this.items.find(item=>item.id == id) ?? null;
	}
	
  
	async findByEmail(email: string): Promise<UserEntity | null> {
		return this.items.find(item=>item.email == email) ?? null;
	}
  
	async findByCPF(cpf: string): Promise<UserEntity | null> {
		return this.items.find(item=>item.cpf == cpf) ?? null;
	}
  
	async create(user: UserEntity): Promise<void> {
		const newUser = UserFactory.create(user, user.id);

		this.items.push(newUser);
	}

}