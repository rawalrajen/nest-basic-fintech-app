import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './services/transfer.service';
import { transferController } from './controllers/transfer.controller';
import { TransferRepository } from './repositories/transfer.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([TransferRepository]),
    QueueModule,
    ConfigModule,
  ],
  providers: [TransferService],
  controllers: [transferController],
  exports: [TransferService],
})
export class TransferModule {}
