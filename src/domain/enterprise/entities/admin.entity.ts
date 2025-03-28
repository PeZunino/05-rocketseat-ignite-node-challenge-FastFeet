import { UserEntity, UserEntityProps } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Optional } from '@/core/types/optional';

export class AdminEntity extends UserEntity {

	static create(props:Optional<UserEntityProps,'createdAt'> , id?:UniqueEntityID){
		const admin = new AdminEntity({
			...props,
			role: Role.ADMIN,
		},id);

		return admin;
	}
	
}