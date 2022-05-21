import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class TransactionQueryDto {
  @IsString()
  @IsOptional()
  keyword: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize: number;

  @IsEnum(['active', 'confirmed'])
  @IsOptional()
  status: string;

  @IsOptional()
  @IsDateString()
  created_at: string;

  @IsOptional()
  @IsDateString()
  updated_at: string;
}
