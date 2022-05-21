import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([UserRepository]),
    QueueModule,
    ConfigModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
