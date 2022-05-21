import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export type TransactionType = 'in' | 'out';
export type TransactionAction = 'deposit' | 'withdraw' | 'transfer';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  amount: number;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: ['in', 'out', 'transfer'],
    default: 'in',
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: ['deposit', 'withdraw', 'transfer'],
    default: 'deposit',
  })
  action: TransactionAction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
