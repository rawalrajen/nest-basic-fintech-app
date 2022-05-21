import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Request } from 'express';
import { TransactionCreateDto } from '../dto/transaction.create.dto';
import { ConfigService } from '@nestjs/config';
import { TransactionQueryDto } from '../dto/transaction.query.dto';

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private configService: ConfigService,
  ) {}

  @Get('transactions')
  @UsePipes(new ValidationPipe({ transform: true }))
  index(@Req() request: Request, @Query() queries: TransactionQueryDto) {
    return this.transactionService.getPaginatedTransactions(request, queries);
  }

  @Get('transactions/:id')
  findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ articles: any }> {
    return this.transactionService.find(request, id);
  }

  @Post('transactions')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: TransactionCreateDto): Promise<any> {
    return this.transactionService.store(body);
  }
}
