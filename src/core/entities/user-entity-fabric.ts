import { Role } from '@prisma/client';
import { AdminEntity } from '@/domain/enterprise/entities/admin.entity';
import { CourierEntity } from '@/domain/enterprise/entities/courier.entity';
import { UserEntity } from './abstract-user.entity';
import { UniqueEntityID } from './unique-id-entity';

// Factory para criar usuário baseado no tipo de role
export class UserFactory {
	static create(props: {
		id?:UniqueEntityID;
		cpf: string;
		email: string;
		name: string;
		password: string;
		role: Role;
		createdAt?: Date;
		packages:UniqueEntityID[]
	}): UserEntity {
		switch (props.role) {
			case Role.ADMIN:
				return AdminEntity.create({
					...props,
					createdPackagesIds: props.packages
				});

			case Role.COURIER:
				return CourierEntity.create({
					...props,
					deliveredPackages: props.packages
				});

			default:
				throw new Error('Role not supported');
		}
	}
}
