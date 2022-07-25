import { IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn, Column } from 'typeorm';


export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    @Column()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @Column()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    lastName: string;

    
    @IsString()
    @Column()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    city: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    phoneNumber: string;
}
