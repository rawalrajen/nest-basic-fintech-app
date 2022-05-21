import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class transferDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status: string;

  @IsOptional()
  @IsDateString()
  created_at: string;

  @IsOptional()
  @IsDateString()
  updated_at: string;
}
