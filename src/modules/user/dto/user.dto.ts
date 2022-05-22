import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  created_at: string;
}
