import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getById(id: number): Promise<User> {
    const user = await this.findOne(id, {
      relations: [],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
