import { INestApplication } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';

describe('Create user (E2E)',()=>{
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
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({
				cpf:'10033273979',
				name:'Pedro Zunino',
				password:'123456',
				role:'ADMIN',
				email:'pedrozunino@gmail.com'
			});

		expect(response.statusCode)
			.toBe(201);
		
		const userOnDatabase = await prisma.user.findUnique({where:{email:'pedrozunino@gmail.com'}});

		expect (userOnDatabase)
			.toBeTruthy();
	});
});