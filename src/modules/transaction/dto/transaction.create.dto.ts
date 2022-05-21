import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class TransactionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsEnum(TransactionType)
  type: string;
}
