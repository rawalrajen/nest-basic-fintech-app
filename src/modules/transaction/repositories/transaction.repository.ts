import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Transaction, TransactionType } from '../transaction.entity';

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

  async getBalanceByUser(userId: number): Promise<any> {
    const deposits = await this.createQueryBuilder('t')
      .where('user_id = :userId', { userId: userId })
      .where('type = :type', { type: TransactionType.IN })
      .select('SUM(t.amount)', 'deposited_amount')
      .groupBy('t.user_id')
      .getRawOne();

    const withdrawls = await this.createQueryBuilder('t')
      .where('user_id = :userId', { userId: userId })
      .where('type = :type', { type: TransactionType.OUT })
      .select('SUM(t.amount)', 'withdrawl_amount')
      .groupBy('t.user_id')
      .getRawOne();

    return deposits.deposited_amount - withdrawls.withdrawl_amount;
  }
}
