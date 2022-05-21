import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['active', 'inactive'])
  status: string;
}
