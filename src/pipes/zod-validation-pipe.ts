import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform{
	constructor(private schema: ZodSchema<unknown>){}
  
	transform(value: any) {
		try{
			this.schema.parse(value);
		}catch(error){
			if(error instanceof ZodError){
				throw new BadRequestException({
					message: 'Validation Error',
					error: error.flatten().fieldErrors
				});

			}

			throw new BadRequestException('Validation failed');
		}

		return value;
	}
}