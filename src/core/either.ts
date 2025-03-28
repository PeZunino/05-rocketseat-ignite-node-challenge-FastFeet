// LEFT e RIGHT
//Failure / Success 

export class Failure<L,R> {
	readonly value: L;

	constructor(value: L) {
		this.value = value;
	}

	isRight(): this is Success<L, R> {

		return false;
	}
	
	isLeft(): this is Failure<L, R> {
	
		return true;
	}
}

export class Success<L,R> {
	readonly value: R;

	constructor(value: R) {
		this.value = value;
	}

	isRight(): this is Success<L, R> {

		return true;
	}
	
	isLeft(): this is Failure<L, R> {
	
		return false;
	}
}

export type Either<L, R> = Failure<L,R> | Success<L,R>

export const failure = <L, R>(value: L): Either<L, R> => {
	return new Failure(value);
};

export const success = <L, R>(value: R): Either<L, R> => {
	return new Success(value);
};