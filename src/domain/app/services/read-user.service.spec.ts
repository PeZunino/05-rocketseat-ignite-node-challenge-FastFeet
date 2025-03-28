import { NotFoundException } from '@nestjs/common';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { ReadUserService } from './read-user.service';

let sut: ReadUserService;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Read User',()=>{
	beforeEach(()=>{
		inMemoryUsersRepository = new InMemoryUsersRepository();

		sut = new ReadUserService(inMemoryUsersRepository);

	});

	it('should be able to read user', async()=>{
		const user = makeUser();

		await inMemoryUsersRepository.create(user);

		const response = await sut.execute({id:user.id});

		expect(response.isSuccessful())
			.toBe(true);
    
	});

	it('should throw exception if user not found', async()=>{
		const response = await sut.execute({id:new UniqueEntityID()});

		expect(response.isFailure())
			.toBe(true);
	
		expect(response.value)
			.toBeInstanceOf(NotFoundException);
	});

  
});