import { IsNotEmpty, IsNumber } from 'class-validator';

export class transferCreateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  from_user_id: number;

  @IsNotEmpty()
  @IsNumber()
  to_user_id: number;
}
