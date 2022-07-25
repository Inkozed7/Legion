import { IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn, Column } from 'typeorm';


export class CreateRoleDto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @Column()
    role: string;
    

    @IsString()
    @Column()
    description: string;
}
