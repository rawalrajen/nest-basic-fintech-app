import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './services/transfer.service';
import { transferController } from './controllers/transfer.controller';
import { TransferRepository } from './repositories/transfer.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';
import { CommissionService } from './services/commission.service';
import { CommissionRepository } from './repositories/commission.repository';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([TransferRepository, CommissionRepository]),
    QueueModule,
    ConfigModule,
  ],
  providers: [TransferService, CommissionService],
  controllers: [transferController],
  exports: [TransferService, CommissionService],
})
export class TransferModule {}
