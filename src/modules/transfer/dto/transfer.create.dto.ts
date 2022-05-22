import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { UserExistsRule } from '../../user/rules/userExist.rule';

export class TransferCreateDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Validate(UserExistsRule)
  from_user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Validate(UserExistsRule)
  to_user_id: number;
}
