import { Package,User } from '@prisma/client';
import { UserEntity } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserFactory } from '@/core/entities/user-entity-fabric';

export class PrismaUserMapper{
	static toDomain({
		cpf,createdAt,email,id,name,password,role,updatedAt
	}: User, packages: Package[]): UserEntity{
		return UserFactory.create({
			email,
			name,
			packages: packages.map(item => new UniqueEntityID(item.id)),
			role: role as Role,
			cpf,
			password,
			createdAt,
			updatedAt
		},new UniqueEntityID(id));
	}
}