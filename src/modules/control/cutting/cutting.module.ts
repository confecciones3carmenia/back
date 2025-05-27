import { Module } from '@nestjs/common';
import { CuttingService } from './cutting.service';
import { CuttingController } from './cutting.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cutting, CuttingSchema } from './entities/cutting.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Cutting.name, schema: CuttingSchema }]),
  ],
  controllers: [CuttingController],
  providers: [CuttingService],
})
export class CuttingModule {}
