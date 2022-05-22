import { HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Request } from 'express';
import { AppLogger } from '../../../logger/logger.service';
import { Between, Like } from 'typeorm';
import { TransactionAction, TransactionType } from '../transaction.entity';
import { ApiException } from '../../../exceptions/api.exception';
import { TransactionDto } from '../dto/transaction.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransactionService {
  constructor(
    private repository: TransactionRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TransactionService.name);
  }

  async getPaginatedTransactions(
    request: Request,
    queries,
  ): Promise<{ data: TransactionDto[]; meta: any }> {
    const page = parseInt(queries.page, 10) || 1;
    const pageSize = parseInt(queries.pageSize, 10) || 10;
    const filterBody = await this.searchConditions(queries);

    const [transactions, count] = await this.repository.findAndCount({
      where: filterBody,
      relations: [],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const paginationMeta = {
      page,
      pageSize,
      count,
    };
    const data = plainToInstance(TransactionDto, transactions, {
      excludeExtraneousValues: true,
    });
    const meta = await this.pagination(paginationMeta);
    return { data, meta };
  }

  async find(request: Request, id: number): Promise<TransactionDto> {
    const transaction = await this.repository.getById(id);

    return plainToInstance(TransactionDto, transaction, {
      excludeExtraneousValues: true,
    });
  }

  async store(requestBody): Promise<TransactionDto> {
    try {
      if (requestBody.type === TransactionType.OUT) {
        const { user_id, amount } = requestBody;
        await this.checkUserHasSufficientBalance(user_id, amount);
      }
      requestBody.action = this.getTransactionAction(requestBody.type);
      const transaction = await this.repository.save(requestBody);

      return plainToInstance(TransactionDto, transaction, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      this.logger.error(requestBody, e.message);
      throw new ApiException(e.message, e.status);
    }
  }

  async searchConditions(queries) {
    const data = {};

    if (queries.keyword) {
      data['amount'] = Like(`%${queries.keyword}%`);
    }

    if (queries.status) {
      data['status'] = Like(`%${queries.status}%`);
    }

    if (queries.created_at_start && queries.created_at_end) {
      data['created_at'] = Between(
        queries.created_at_start,
        queries.created_at_end,
      );
    }

    return data;
  }

  async pagination(data) {
    return {
      current_page: data.page,
      from: (data.page - 1) * data.pageSize + 1,
      last_page: Math.ceil(data.count / data.pageSize),
      per_page: data.pageSize,
      to: data.page * data.pageSize,
      total: data.count,
    };
  }

  async checkUserHasSufficientBalance(userId: number, withdrawlAmount: number) {
    const userBalance = await this.repository.getBalanceByUser(userId);

    if (withdrawlAmount > userBalance) {
      throw new ApiException(
        'Not sufficient balance to withdraw',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  getTransactionAction(type) {
    if (type === TransactionType.IN) {
      return TransactionAction.DEPOSIT;
    }

    if (type === TransactionType.OUT) {
      return TransactionAction.WITHDRAW;
    }

    throw new ApiException('Invalid transaction type', HttpStatus.BAD_REQUEST);
  }
}
