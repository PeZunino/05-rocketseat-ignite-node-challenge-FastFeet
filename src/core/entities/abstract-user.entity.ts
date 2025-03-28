import { Entity } from '@/core/entities/abstract-entity.entity';
import { Role } from '@/core/entities/role.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Optional } from '../types/optional';

export interface UserEntityProps{
	email: string         
	role: Role
	cpf:string
	password:string        
	name:string  
	createdAt: Date  
	updatedAt?: Date | null
	packages:UniqueEntityID[] 
}

export abstract class UserEntity extends Entity<UserEntityProps>{
	protected constructor(props: Optional<UserEntityProps, 'createdAt'>, id?: UniqueEntityID) {
		super({
			...props,
			createdAt: props.createdAt ?? new Date(),
		}, id);
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	get email(){
		return this.props.email;
	}
	get role(){
		return this.props.role;
	}
	get cpf(){
		return this.props.cpf;
	}
	get password(){
		return this.props.password;
	}
	get name(){
		return this.props.name;
	}
	get createdAt(){
		return this.props.createdAt;
	}
	get updatedAt(){
		return this.props.updatedAt;
	}
	get packages(){
		return this.props.packages;
	}
  
	
	set packages(ids:UniqueEntityID[]){
		this.props.packages = ids;

		this.touch();
	}
	set email(email:string){
		this.props.email = email;

		this.touch();
	}
	set cpf(cpf:string){
		this.props.cpf = cpf;

		this.touch();
	}
	set password(password:string){
		this.props.password = password;

		this.touch();
	}
	set name(name:string){
		this.props.name = name;

		this.touch();
	}
}