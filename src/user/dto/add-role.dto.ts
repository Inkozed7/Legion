import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
