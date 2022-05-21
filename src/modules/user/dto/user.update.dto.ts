import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status: string;
}
