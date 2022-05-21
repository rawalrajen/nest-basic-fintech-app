import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([TransactionRepository]),
    QueueModule,
    ConfigModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
