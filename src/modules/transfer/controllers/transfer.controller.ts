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
import { TransferService } from '../services/transfer.service';
import { Request } from 'express';
import { transferCreateDto } from '../dto/transfer.create.dto';
import { ConfigService } from '@nestjs/config';
import { transferQueryDto } from '../dto/transfer.query.dto';

@Controller()
export class transferController {
  constructor(
    private readonly transferService: TransferService,
    private configService: ConfigService,
  ) {}

  @Get('transfers')
  @UsePipes(new ValidationPipe({ transform: true }))
  index(@Req() request: Request, @Query() queries: transferQueryDto) {
    return this.transferService.getPaginatedtransfers(request, queries);
  }

  @Get('transfers/:id')
  findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ articles: any }> {
    return this.transferService.find(request, id);
  }

  @Post('transfers')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: transferCreateDto): Promise<any> {
    return this.transferService.store(body);
  }
}
