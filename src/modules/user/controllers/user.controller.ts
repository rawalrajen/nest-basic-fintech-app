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

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  index(@Req() request: Request, @Query() queries: UserQueryDto) {
    return this.userService.getPaginatedUsers(request, queries);
  }

  @Get('users/:id')
  findOne(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ articles: any }> {
    return this.userService.find(request, id);
  }

  @Post('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: UserCreateDto): Promise<any> {
    return this.userService.store(body);
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Body() body: UserUpdateDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    const user = await this.userService.update(body, id);

    return { data: user };
  }

  @Delete('users/:id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.destroy(id);
  }
}
