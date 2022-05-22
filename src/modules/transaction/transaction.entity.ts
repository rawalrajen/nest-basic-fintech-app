import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Transfer } from '../transfer/transfer.entity';
import { User } from '../user/user.entity';

export enum TransactionAction {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export enum TransactionType {
  IN = 'in',
  OUT = 'out',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  amount: number;

  @Column()
  user_id: number;

  @Column()
  transfer_id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.IN,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionAction,
    default: TransactionAction.DEPOSIT,
  })
  action: TransactionAction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Transfer, (transfer) => transfer.transactions)
  @JoinColumn({ name: 'transfer_id' })
  transfer: Transfer;

  @ManyToOne(() => User, (user) => user.transactions, { eager: false })
  @JoinColumn({ name: 'user_id' })
  actor: User;
}
