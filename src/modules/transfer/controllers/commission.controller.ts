import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { transferQueryDto } from '../dto/transfer.query.dto';
import { CommissionService } from '../services/commission.service';

@Controller()
export class CommissionController {
  constructor(
    private readonly commissionService: CommissionService,
    private configService: ConfigService,
  ) {}

  @Get('commissions')
  @UsePipes(new ValidationPipe({ transform: true }))
  index(@Req() request: Request, @Query() queries: transferQueryDto) {
    return this.commissionService.getPaginatedCommissions(request, queries);
  }

  @Get('commissions/:id')
  findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ articles: any }> {
    return this.commissionService.find(request, id);
  }
}
