import { IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class LoginUserDto {
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
}
