import { IsEnum, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { TransactionType } from '../transaction.entity';
import { UserExistsRule } from '../../user/rules/userExist.rule';

export class TransactionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Validate(UserExistsRule)
  user_id: number;

  @IsEnum(TransactionType)
  type: string;
}
