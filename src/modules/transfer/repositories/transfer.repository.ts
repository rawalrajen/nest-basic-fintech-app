import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Transfer } from '../transfer.entity';

@EntityRepository(Transfer)
export class TransferRepository extends Repository<Transfer> {
  async getById(id: number): Promise<Transfer> {
    const user = await this.findOne(id, {
      relations: [],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
