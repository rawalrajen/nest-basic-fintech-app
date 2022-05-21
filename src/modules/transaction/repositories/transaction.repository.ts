import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async getById(id: number): Promise<Transaction> {
    const user = await this.findOne(id, {
      relations: [],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
