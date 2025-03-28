

import { Entity } from '@/core/entities/abstract-entity.entity';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Optional } from '@/core/types/optional';

interface ReceiverEntityProps{
	email :string   
	name :string
	createdAt :Date 
	updatedAt ?:Date
	packagesIds :UniqueEntityID[]
}

export class ReceiverEntity extends Entity<ReceiverEntityProps> {
	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props:Optional<ReceiverEntityProps, 'createdAt'>, id?:UniqueEntityID){
		const courier = new ReceiverEntity({
			...props,
			createdAt: props.createdAt ?? new Date(),
		},id);

		return courier;
	}

	get email(){
		return this.props.email;
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
	get packagesIds(){
		return this.props.packagesIds;
	}
  
	set email(email:string){
		this.props.email = email;

		this.touch();
	}
	set name(name:string){
		this.props.name = name;

		this.touch();
	}
	set deliveredPackages(ids:UniqueEntityID[]){
		this.props.packagesIds = ids;

		this.touch();
	}
}