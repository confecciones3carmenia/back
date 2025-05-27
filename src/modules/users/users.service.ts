import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { handleException } from 'src/common/utils/handleExeptions';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = (await this.userModel.create(createUserDto)).populate(
        'role',
        'name',
      );
      return user;
    } catch (error) {
      handleException(error, 'user.service-create', 'user');
    }
  }

  findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.userModel
      .find()
      .populate('authInfo', 'userName email')
      .populate('role', 'name')
      .limit(limit)
      .skip(offset);
  }

  findAllByContract(paginationDto: PaginationDto, contract: string) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.userModel
      .find({ contract: contract })
      .populate('authInfo', 'userName email')
      .populate('role', 'name')
      .limit(limit)
      .skip(offset);
  }

  async findOne(term: string) {
    let user: User;

    try {
      user = await this.userModel
        .findById({ _id: term })
        .populate('authInfo', '_id userName email isActive')
        .populate('role', 'name');
    } catch (error) {
      Logger.error(error);
    }

    if (!user)
      throw new NotFoundException(
        `El usuario con id o nombre de usuario: "${term}" no fue encontrado`,
      );

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let userDB: User;
    try {
      userDB = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      handleException(error, 'user.service-update', 'user');
    }

    if (!userDB)
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);

    return userDB;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id });
  }
}
