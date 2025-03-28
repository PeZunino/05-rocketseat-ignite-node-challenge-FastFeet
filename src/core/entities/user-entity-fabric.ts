
import { AdminEntity } from '@/domain/enterprise/entities/admin.entity';
import { CourierEntity } from '@/domain/enterprise/entities/courier.entity';
import { Optional } from '../types/optional';
import { UserEntity, UserEntityProps } from './abstract-user.entity';
import { Role } from './role.enum';
import { UniqueEntityID } from './unique-id-entity';


export class UserFactory {

	static create(props: Optional<UserEntityProps,'createdAt'>,id?:UniqueEntityID): UserEntity {

		switch (props.role) {
			case Role.ADMIN:
				return AdminEntity.create({
					packages:props.packages,
					cpf:props.cpf,
					createdAt:props.createdAt,
					email:props.email,
					name:props.name,
					password:props.password,
					role:props.role, 
				},id);

			case Role.COURIER:
				return CourierEntity.create({
					cpf:props.cpf,
					createdAt:props.createdAt,
					packages:props.packages,
					email:props.email,
					name:props.name,
					password:props.password,
					role:props.role,
				},id);

			default:
				throw new Error('Role not supported');
		}
	}
}
