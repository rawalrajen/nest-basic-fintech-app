import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Request } from 'express';
import { AppLogger } from '../../../logger/logger.service';
import { Between, Like } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { ApiException } from '../../../exceptions/api.exception';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getPaginatedUsers(
    request: Request,
    queries,
  ): Promise<{ data: UserDto[]; meta: any }> {
    const page = parseInt(queries.page, 10) || 1;
    const pageSize = parseInt(queries.pageSize, 10) || 10;
    const filterBody = await searchConditions(queries);

    const [users, count] = await this.repository.findAndCount({
      where: filterBody,
      relations: [],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const paginationData = {
      page,
      pageSize,
      count,
    };
    const data = plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });
    const meta = await pagination(paginationData);
    return { data, meta };
  }

  async find(request: Request, id: number): Promise<UserDto> {
    this.logger.log(request, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(id);

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async store(body): Promise<UserDto> {
    this.logger.log(body, `calling ${UserRepository.name}.save`);
    try {
      const user = await this.repository.save(body);

      return plainToInstance(UserDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      this.logger.error(body, e.message);
      throw new ApiException(e.message, e.status);
    }
  }

  async update(body, id): Promise<UserDto> {
    this.logger.log(body, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(id);

    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser: User = {
      ...user,
      ...body,
    };
    await this.repository.save(updatedUser);

    return plainToInstance(UserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async destroy(id): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}

async function searchConditions(queries) {
  const data = {};

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
