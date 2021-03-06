import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AppLogger } from '../../../logger/logger.service';
import { Between, Like } from 'typeorm';
import { ApiException } from '../../../exceptions/api.exception';
import { CommissionRepository } from '../repositories/commission.repository';

@Injectable()
export class CommissionService {
  constructor(
    private repository: CommissionRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CommissionService.name);
  }

  async getPaginatedCommissions(request: Request, queries) {
    const page = parseInt(queries.page, 10) || 1;
    const pageSize = parseInt(queries.pageSize, 10) || 10;
    const filterBody = await this.searchConditions(queries);

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
    const meta = await this.pagination(data);
    return { users, meta };
  }

  async find(request: Request, id: number): Promise<{ articles: any }> {
    const articles = await this.repository.getById(id);
    return { articles };
  }

  async store(body): Promise<any> {
    try {
      return await this.repository.save(body);
    } catch (e) {
      this.logger.error(body, e.message);
      throw new ApiException(e.message, 400);
    }
  }

  async searchConditions(queries) {
    const data = {};

    if (queries.keyword) {
      data['amount'] = Like(`%${queries.keyword}%`);
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
}
