import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Request } from 'express';
import { AppLogger } from '../../../logger/logger.service';
import { Between, Like } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { ApiException } from '../../../exceptions/api.exception';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getPaginatedUsers(request: Request, queries) {
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
    this.logger.log(request, `calling ${UserRepository.name}.findAndCount`);
    const articles = await this.repository.getById(id);
    return { articles };
  }

  async store(body): Promise<{ article: any }> {
    this.logger.log(body, `calling ${UserRepository.name}.findAndCount`);
    try {
      return await this.repository.save(body);
    } catch (e) {
      this.logger.error(body, e.message);
      throw new ApiException(e.message, 400);
    }
  }

  async update(body, id): Promise<UserDto> {
    this.logger.log(body, `calling ${UserRepository.name}.findAndCount`);
    const user = await this.repository.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser: User = {
      ...user,
      ...body,
    };

    await this.repository.save(updatedUser);

    return plainToClass(UserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async destroy(id): Promise<{ article: any }> {
    const user = await this.repository.delete(id);
    return { article: user };
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
