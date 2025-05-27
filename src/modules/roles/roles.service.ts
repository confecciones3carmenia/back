import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { handleException } from 'src/common/utils/handleExeptions';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      createRoleDto.name = createRoleDto.name.toLowerCase();
      const role = await this.roleModel.create(createRoleDto);
      return role;
    } catch (error) {
      handleException(error, 'roles.service-create', 'role');
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.roleModel.find().limit(limit).skip(offset).sort({ name: 1 });
  }

  async findOne(term: string) {
    let role: Role;

    role = await this.roleModel.findById({ _id: term });

    if (!role) role = await this.roleModel.findOne({ name: term });

    if (!role)
      throw new NotFoundException(
        `El rol con id o nombre: "${term}" no fue encontrado`,
      );

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findById({ _id: id });
    if (updateRoleDto.name)
      updateRoleDto.name = updateRoleDto.name.toLowerCase().trim();
    let roleDB: Role;
    try {
      roleDB = await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
    } catch (error) {
      handleException(error, 'role.service-update', 'role');
    }

    if (!role || !roleDB)
      throw new NotFoundException(`El rol con id ${id} no fue encontrado`);

    return roleDB;
  }

  async remove(id: string) {
    const { modifiedCount } = await this.roleModel.updateOne(
      { _id: id },
      { isActive: false },
    );

    if (modifiedCount === 0)
      throw new BadRequestException(
        `El rol con id "${id}" no  se encuentra en la DB`,
      );

    return;
  }
}
