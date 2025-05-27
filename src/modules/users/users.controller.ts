import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthValidate, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/entities/auth.entity';

@Controller('users')
// @AuthValidate()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    // @GetUser() user: Auth
    ) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('contrato/:contrato')
  findAllByContract(
    @Param('contrato') contract: string,
    @Query() paginationDto: PaginationDto,
    ) {
    return this.usersService.findAllByContract(paginationDto, contract);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
