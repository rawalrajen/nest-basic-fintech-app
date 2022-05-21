import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './config/app.config';
import { UserModule } from './modules/user/user.module';
import { AppLoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    DatabaseModule,
    QueueModule,
    AppLoggerModule,
    UserModule,
    TransactionModule,
  ],
  exports: [AppLoggerModule, ConfigModule],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    AppService,
  ],
})
export class AppModule {}
