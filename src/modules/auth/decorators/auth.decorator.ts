import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function AuthValidate(...roles: ValidRoles[]) {
  return applyDecorators(
    UseGuards(AuthGuard(), UserRoleGuard),
    RoleProtected(...roles),
  );
}
