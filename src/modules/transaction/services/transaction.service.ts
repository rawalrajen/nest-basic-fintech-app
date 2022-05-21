import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Request } from 'express';
import { AppLogger } from '../../../logger/logger.service';
import { Between, Like } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Transaction } from '../transaction.entity';
import { TransactionDto } from '../dto/transaction.dto';
import { ApiException } from '../../../exceptions/api.exception';

@Injectable()
export class TransactionService {
  constructor(
    private repository: TransactionRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TransactionService.name);
  }

  async getPaginatedTransactions(request: Request, queries) {
    const page = parseInt(queries.page, 10) || 1;
    const pageSize = parseInt(queries.pageSize, 10) || 10;
    const filterBody = await searchConditions(queries);

    const [users, count] = await this.repository.findAndCount({
      where: filterBody,
      relations: [],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const data = {
      page,
      pageSize,
      count,
    };
    const meta = await pagination(data);
    return { users, meta };
  }

  async find(request: Request, id: number): Promise<{ articles: any }> {
    const articles = await this.repository.getById(id);
    return { articles };
  }

  async store(body): Promise<{ article: any }> {
    try {
      return await this.repository.save(body);
    } catch (e) {
      this.logger.error(body, e.message);
      throw new ApiException(e.message, 400);
    }
  }

  async update(body, id): Promise<TransactionDto> {
    const transaction = await this.repository.getById(id);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const updatedUser: Transaction = {
      ...transaction,
      ...body,
    };

    await this.repository.save(updatedUser);

    return plainToClass(TransactionDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async destroy(id): Promise<{ article: any }> {
    const transaction = await this.repository.delete(id);
    return { article: transaction };
  }
}

async function searchConditions(queries) {
  const data = {};

  if (queries.keyword) {
    data['subject'] = Like(`%${queries.keyword}%`);
  }

  if (queries.recipient_group) {
    data['recipient_group'] = Like(`%${queries.recipient_group}%`);
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

async function pagination(data) {
  return {
    current_page: data.page,
    from: (data.page - 1) * data.pageSize + 1,
    last_page: Math.ceil(data.count / data.pageSize),
    per_page: data.pageSize,
    to: data.page * data.pageSize,
    total: data.count,
  };
}
