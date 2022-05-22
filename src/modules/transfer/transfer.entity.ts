import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Commission } from './commission.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  amount: number;

  @Column()
  from_user_id: number;

  @Column()
  to_user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Commission, (commission) => commission.transfer)
  commission: Commission;

  @OneToMany(() => Transaction, (transaction) => transaction.transfer)
  transactions: Transaction[];
}
