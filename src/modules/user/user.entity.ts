import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
export type UserStatus = 'active' | 'inactive';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'pending',
  })
  status: UserStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.actor)
  transactions: Transaction[];
}
