import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Transfer } from './transfer.entity';

export const COMMISSION_PERCENTAGE = 2;

@Entity()
export class Commission {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  amount: number;

  @Column()
  transfer_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Transfer)
  @JoinColumn({ name: 'transfer_id' })
  transfer: Transfer;
}
