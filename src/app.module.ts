import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { GarmentsModule } from './modules/garments/garments.module';
import { CuttingModule } from './modules/control/cutting/cutting.module';
import { EmbroideryModule } from './modules/control/embroidery/embroidery.module';
import { StampedModule } from './modules/control/stamped/stamped.module';
import { QualityModule } from './modules/control/quality/quality.module';
import { OperationsModule } from './modules/resources/operations/operations.module';
import { TimesModule } from './modules/resources/times/times.module';
import { ConfectionModule } from './modules/control/confection/confection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(`${process.env.MONGO}`),
    AuthModule,
    CommonModule,
    RolesModule,
    UsersModule,
    GarmentsModule,
    CuttingModule,
    EmbroideryModule,
    StampedModule,
    QualityModule,
    OperationsModule,
    TimesModule,
    ConfectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
