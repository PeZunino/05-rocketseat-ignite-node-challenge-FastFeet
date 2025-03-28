import { faker } from '@faker-js/faker';
import { hashSync } from 'bcryptjs';
import { UserEntity } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserFactory } from '@/core/entities/user-entity-fabric';

export function makeUser(
	override: Partial<UserEntity> = {},
	id?:UniqueEntityID
){
	const user = UserFactory.create({
		id,
		cpf: faker.finance.accountNumber(11),
		email: faker.internet.email(),
		name: faker.person.fullName(),
		packages: [],
		password: hashSync(faker.internet.password(),8),
		role: Role.COURIER,
		...override
	});

	return user;
}