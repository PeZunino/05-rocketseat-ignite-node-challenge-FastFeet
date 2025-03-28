import { ConflictException } from '@nestjs/common';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { CreateUserUseCase } from './create-user.service';

let sut: CreateUserUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Create User',()=>{
	beforeEach(()=>{
		inMemoryUsersRepository = new InMemoryUsersRepository();

		sut = new CreateUserUseCase(inMemoryUsersRepository);

	});

	it('should be able to create user', async()=>{
		const user = makeUser();

		const response = await sut.execute(user);

		expect(response.isSuccessful())
			.toBe(true);
	});

	it('should not be able to create user with already in use CPF', async()=>{
		const user = makeUser();

		await sut.execute(user);

		const response = await sut.execute(makeUser({email:user.email}));

		expect(response.isFailure())
			.toBe(true);

		expect(response.value)
			.instanceOf(ConflictException );
	});

	it('should not be able to create user with already in use e-mail', async()=>{
		const user = makeUser();

		await sut.execute(user);

		const response = await sut.execute(makeUser({cpf:user.cpf}));

		expect(response.isFailure())
			.toBe(true);

		expect(response.value)
			.instanceOf(ConflictException );
	});
	
});