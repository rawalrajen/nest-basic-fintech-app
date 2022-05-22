import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './services/transfer.service';
import { TransferController } from './controllers/transfer.controller';
import { TransferRepository } from './repositories/transfer.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';
import { CommissionService } from './services/commission.service';
import { CommissionRepository } from './repositories/commission.repository';
import { CommissionController } from './controllers/commission.controller';
import { TransactionService } from '../transaction/services/transaction.service';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionRepository } from '../transaction/repositories/transaction.repository';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([TransferRepository, CommissionRepository, TransactionRepository]),
    QueueModule,
    ConfigModule,
    TransactionModule,
  ],
  providers: [TransferService, CommissionService, TransactionService],
  controllers: [TransferController, CommissionController],
  exports: [TransferService, CommissionService],
})
export class TransferModule {}
