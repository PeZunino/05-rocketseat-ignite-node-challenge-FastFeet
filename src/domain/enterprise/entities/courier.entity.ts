import { UserEntity } from '@/core/entities/abstract-user.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Optional } from '@/core/types/optional';

interface CourierEntityProps{
	email: string         
	cpf:string
	password:string        
	name:string  
	createdAt: Date  
	updatedAt?: Date 
	deliveredPackages: UniqueEntityID[] 
}

export class CourierEntity extends UserEntity {
	

	static create(props:Optional<CourierEntityProps,'createdAt'>, id?:UniqueEntityID){
		const admin = new CourierEntity({
			...props,
			role: Role.ADMIN,
			packages:props.deliveredPackages
		},id);

		return admin;
	}
}