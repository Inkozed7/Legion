import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PrimaryGeneratedColumn, Column } from 'typeorm';


export class AddRoleDto {
	@PrimaryGeneratedColumn()
	id: number;

	@IsString()
	role: string;

	@IsNumber()
	idUser: number;
}
