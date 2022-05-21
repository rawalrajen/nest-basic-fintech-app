import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsEnum(['in', 'out'])
  type: string;
}
