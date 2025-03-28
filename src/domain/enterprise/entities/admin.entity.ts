import { UserEntity } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Optional } from '@/core/types/optional';

interface AdminEntityProps{
	email: string         
	cpf:string
	password:string        
	name:string  
	createdAt: Date  
	updatedAt?: Date 
	createdPackagesIds: UniqueEntityID[] 
}

export class AdminEntity extends UserEntity {

	static create(props:Optional<AdminEntityProps, 'createdAt'>, id?:UniqueEntityID){
		const admin = new AdminEntity({
			...props,
			role: Role.ADMIN,
			packages:props.createdPackagesIds
		},id);

		return admin;
	}
	
}