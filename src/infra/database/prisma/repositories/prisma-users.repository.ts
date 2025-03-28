import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/core/entities/abstract-user.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserFactory } from '@/core/entities/user-entity-fabric';
import { UsersRepository } from '@/domain/app/repositories/users.repository';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository{
	
	constructor(private prisma: PrismaService){}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.prisma.user.findUnique({
			where:{email},
			include: {packages: true}
		}) ?? null;

		if(!user){
			return null;
		}

		return PrismaUserMapper.toDomain(user,user.packages);
	}

	async findByCPF(cpf: string): Promise<UserEntity | null> {
		const user = await this.prisma.user.findUnique({
			where:{cpf},
			include: {packages: true}
		}) ?? null;

		if(!user){
			return null;
		}

		return PrismaUserMapper.toDomain(user,user.packages);
	}

	async findById(id: UniqueEntityID): Promise<UserEntity | null> {
		const user = await this.prisma.user.findUnique({
			where:{id: id.toString()},
			include: {packages: true}
		}) ?? null;

		if(!user){
			return null;
		}

		return PrismaUserMapper.toDomain(user,user.packages);
	}

	async create(user:UserEntity): Promise<void> {
		const {
			cpf,createdAt,email,id,updatedAt,name,password,role
		} = UserFactory.create(user, user.id);
		
		
		await this.prisma.user.create({
			data:{
				cpf,
				email,
				name,
				password,
				role,
				createdAt,
				id: id.toString(),
				updatedAt
			}
		});
	}

}