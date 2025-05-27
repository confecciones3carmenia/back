import { Module } from '@nestjs/common';
import { QualityService } from './quality.service';
import { QualityController } from './quality.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Quality, QualitySchema } from './entities/quality.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Quality.name, schema: QualitySchema }]),
  ],
  controllers: [QualityController],
  providers: [QualityService],
})
export class QualityModule {}
