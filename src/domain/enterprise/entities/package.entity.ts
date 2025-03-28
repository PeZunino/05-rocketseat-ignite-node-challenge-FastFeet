import { Optional } from '@prisma/client/runtime/library';
import { Entity } from '@/core/entities/abstract-entity.entity';
import { Status } from '@/core/entities/status.enum';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

interface PackageProps{
	status: Status
	address:string
	receiverId:UniqueEntityID   
	courierId:UniqueEntityID 
	adminId:UniqueEntityID 
	createdAt: Date  
	updatedAt?: Date 
}

export class PackageEntity extends Entity<PackageProps>{
	private touch(){
		this.props.updatedAt = new Date();
	}
  
	static create(props:Optional<PackageProps, 'createdAt'>, id?:UniqueEntityID){
		const courier = new PackageEntity({
			...props,
			createdAt: props.createdAt ?? new Date(),
		},id);
  
		return courier;
	}
    
	get status(){
		return this.props.status;
	}
	get address(){
		return this.props.address;
	}
	get receiverId(){
		return this.props.receiverId;
	}
	get courierId(){
		return this.props.courierId;
	}
	get adminId(){
		return this.props.adminId;
	}

	set status(status: Status){
		this.props.status = status;
  
		this.touch();
	}
	set address(address:string){
		this.props.address = address;
  
		this.touch();
	}
	set receiverId(receiverId:UniqueEntityID ){
		this.props.receiverId = receiverId;
  
		this.touch();
	}
	set courierId(courierId:UniqueEntityID ){
		this.props.courierId = courierId;
  
		this.touch();
	}
	set adminId(adminId:UniqueEntityID ){
		this.props.adminId = adminId;
  
		this.touch();
	}
}