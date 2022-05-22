import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserUpdateDto } from '../dto/user.update.dto';
import { ConfigService } from '@nestjs/config';
import { UserQueryDto } from '../dto/user.query.dto';
import { UserDto } from '../dto/user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  index(
    @Req() request: Request,
    @Query() queries: UserQueryDto,
  ): Promise<{ data: UserDto[] }> {
    return this.userService.getPaginatedUsers(request, queries);
  }

  @Get('users/:id')
  async findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ data: UserDto }> {
    const user = await this.userService.find(request, id);

    return { data: user };
  }

  @Post('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<{ data: UserDto }> {
    const user = await this.userService.store(userCreateDto);

    return { data: user };
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Body() userUpdateDto: UserUpdateDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ data: UserDto }> {
    const user = await this.userService.update(userUpdateDto, id);

    return { data: user };
  }

  @Delete('users/:id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.destroy(id);
  }
}
