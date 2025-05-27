/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { handleException } from 'src/common/utils/handleExeptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Auth, AuthDocument } from './entities/auth.entity';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, ...userData } = createAuthDto;

      if (createAuthDto.user) {
        const authUser: Auth = await this.authModel.create({
          ...userData,
          email: createAuthDto.email.toLowerCase().trim(),
          isActive: true,
          password: bcrypt.hashSync(password, 10),
        });
        delete authUser.password;

        const role = await this.rolesService.findOne('Operador');
        const user: CreateUserDto = {
          authInfo: new Types.ObjectId(authUser._id as string),
          role: new Types.ObjectId(role._id as string),
          name: '',
          lastname: '',
          position: '',
        };

        const resUser = await this.userService.create(user);

        await this.authModel.findByIdAndUpdate(authUser._id, {
          user: resUser._id,
        });

        return { authUser, resUser };
      } else {
        return await this.authModel.create({
          ...createAuthDto,
          email: createAuthDto.email.toLowerCase().trim(),
          isActive: true,
          password: bcrypt.hashSync(password, 10),
        });
      }
    } catch (error) {
      handleException(error, 'auth.service-create', 'auth');
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;
    const auth = await this.authModel
      .findOne({ email })
      .select('_id email userName password user, isActive')
      .populate([
        {
          path: 'user',
          populate: [{ path: 'role', select: '_id name' }],
        },
      ]);

    if (!auth) throw new UnauthorizedException('Credenciales no válidas');

    if (!auth.isActive)
      throw new UnauthorizedException(
        'Usuario inactivo, comuniquese con el administrador del programa',
      );

    if (!bcrypt.compareSync(password, auth.password))
      throw new UnauthorizedException('Credenciales no válidas');

    const payload: JwtPayload = { _id: auth._id as string, email: auth.email };
    const { password: _, ...rest } = auth.toJSON();
    return {
      auth: rest,
      token: this.getJwtToken(payload),
    };
  }

  async checkAuthStatus(userAuth: Auth) {
    const payload: JwtPayload = {
      _id: userAuth._id as string,
      email: userAuth.email,
    };
    const { password: _, ...rest } = (
      await this.getUserInfo(userAuth._id as string)
    ).toJSON();
    const response = rest;
    console.log('el response', response);
    return {
      auth: response,
      token: this.getJwtToken(payload),
    };
  }

  private async getUserInfo(id: string) {
    return await this.authModel
      .findById(id)
      .select('_id email userName password user, isActive')
      .populate([
        {
          path: 'user',
          populate: [{ path: 'role', select: '_id name' }],
        },
      ]);
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
