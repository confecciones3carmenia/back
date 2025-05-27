import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Auth } from '../../entities/auth.entity';
import { ROLES } from '../../decorators/role-protected.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  private validRoles: string[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.validRoles = this.reflector.getAllAndOverride(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!this.validRoles || this.validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userAuth = req.user as Auth;

    if (!userAuth) throw new BadRequestException('User not found in DB');

    return this.getUser(userAuth.user.toString()).then((user) => {
      if (!user)
        throw new BadRequestException('User not found, user-role-guard');

      if (this.validRoles.includes(user.role.name)) {
        return true;
      }

      throw new ForbiddenException(
        `User ${user.authInfo.userName} need a valid role`,
      );
    });
  }

  async getUser(userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }
}
