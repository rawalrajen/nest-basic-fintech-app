import { EventSubscriber } from 'typeorm';
import { EntitySubscriberInterface, InsertEvent } from 'typeorm/browser';
import { Transfer } from '../transfer.entity';
import { Commission, COMMISSION_PERCENTAGE } from '../commission.entity';
import {
  Transaction,
  TransactionAction,
  TransactionType,
} from '../../transaction/transaction.entity';

@EventSubscriber()
export class TransferSubscriber implements EntitySubscriberInterface<Transfer> {
  /**
   * Indicates that this subscriber only listen to transfer events.
   */
  listenTo() {
    return Transfer;
  }

  async afterInsert(event: InsertEvent<Transfer>) {
    await this.calculateAndStoreCommission(event);
    await this.recordWithdrawTransaction(event);
    await this.recordDepositTransaction(event);
  }

  async calculateAndStoreCommission(event: InsertEvent<Transfer>) {
    const commissionRepository = event.manager.getRepository(Commission);
    const commission = new Commission();
    commission.amount = event.entity.amount * (COMMISSION_PERCENTAGE / 100);
    commission.transfer = event.entity;

    await commissionRepository.save(commission);
  }

  async recordWithdrawTransaction(event: InsertEvent<Transfer>) {
    const transactionRepository = event.manager.getRepository(Transaction);
    const transaction = new Transaction();
    transaction.amount = event.entity.amount;
    transaction.type = TransactionType.OUT;
    transaction.action = TransactionAction.WITHDRAW;
    transaction.transfer = event.entity;
    transaction.user_id = event.entity.from_user_id;

    await transactionRepository.save(transaction);
  }

  async recordDepositTransaction(event: InsertEvent<Transfer>) {
    const transactionRepository = event.manager.getRepository(Transaction);
    const transaction = new Transaction();
    transaction.amount = event.entity.amount;
    transaction.type = TransactionType.IN;
    transaction.action = TransactionAction.DEPOSIT;
    transaction.transfer = event.entity;
    transaction.user_id = event.entity.to_user_id;

    await transactionRepository.save(transaction);
  }
}
