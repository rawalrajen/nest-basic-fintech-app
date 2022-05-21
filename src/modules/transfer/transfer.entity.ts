import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
