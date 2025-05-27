import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthValidate } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('roles')
// @AuthValidate(ValidRoles.superAdmin)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  // @AuthValidate(ValidRoles.superAdmin)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rolesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rolesService.findOne(term);
  }

  @Patch(':id')
  // @AuthValidate(ValidRoles.superAdmin)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  // @AuthValidate(ValidRoles.superAdmin)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.rolesService.remove(id);
  }
}
