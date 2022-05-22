import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class TransactionDto {
  @Expose()
  id: number;

  @Expose()
  amount: number;

  @Expose()
  action: string;

  @Expose()
  created_at: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
