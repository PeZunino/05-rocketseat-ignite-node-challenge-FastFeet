import { INestApplication } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/prisma/prisma.service';

describe('Auth user (E2E)',()=>{
	let app:INestApplication;

	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				AppModule
			],
		})
			.compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

		await app.init();
	});

	test('[POST] /users', async ()=>{
		await prisma.user.create({
			data:{
				cpf:'10033273979',
				name:'Pedro Zunino',
				password: await hash('123456',8),
				role:'ADMIN',
				email:'pedrozunino@gmail.com'
			}
		});

		const response = await request(app.getHttpServer())
			.post('/sessions')
			.send({
				cpf:'10033273979',
				password:'123456',
			});

		expect(response.statusCode)
			.toBe(201);
    
		expect(response.body)
			.toEqual({access_token: expect.any(String)});
    
	});
});