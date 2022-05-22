import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Request } from 'express';
import { TransactionCreateDto } from '../dto/transaction.create.dto';
import { ConfigService } from '@nestjs/config';
import { TransactionQueryDto } from '../dto/transaction.query.dto';
import { TransactionDto } from '../dto/transaction.dto';

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private configService: ConfigService,
  ) {}

  @Get('transactions')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async index(@Req() request: Request, @Query() queries: TransactionQueryDto) {
    return this.transactionService.getPaginatedTransactions(request, queries);
  }

  @Get('transactions/:id')
  async findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ data: TransactionDto }> {
    const transaction = await this.transactionService.find(request, id);

    return { data: transaction };
  }

  @Post('transactions')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: TransactionCreateDto): Promise<any> {
    return this.transactionService.store(body);
  }
}
