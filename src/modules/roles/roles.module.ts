import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    CommonModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
