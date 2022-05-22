import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { AppLoggerModule } from '../../logger/logger.module';
import { QueueModule } from '../../queue/queue.module';
import { ConfigModule } from '@nestjs/config';
import { UserExistsRule } from './rules/userExist.rule';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([UserRepository]),
    QueueModule,
    ConfigModule,
  ],
  providers: [UserService, UserExistsRule],
  controllers: [UserController],
  exports: [UserService, UserExistsRule],
})
export class UserModule {}
