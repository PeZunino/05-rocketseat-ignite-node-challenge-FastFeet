import { UniqueEntityID } from './unique-id-entity';

export abstract class Entity<Props>{
	private _id:UniqueEntityID;

	protected constructor(protected props:Props, id?:UniqueEntityID){
		this.props = props;

		this._id = id ?? new UniqueEntityID();
	}

	get id() {
		return this._id;
	}
	
	public equals(entity: Entity<any>) {
		if (entity === this) {
			return true;
		}

		if (entity.id === this._id) {
			return true;
		}

		return false;
	}
}