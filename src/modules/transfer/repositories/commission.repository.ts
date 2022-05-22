import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Transfer } from '../transfer.entity';
import { Commission } from '../commission.entity';

@EntityRepository(Commission)
export class CommissionRepository extends Repository<Transfer> {
  async getById(id: number): Promise<Transfer> {
    const user = await this.findOne(id, {
      relations: [],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
