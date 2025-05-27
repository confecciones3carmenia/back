import { Module } from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { GarmentsController } from './garments.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Garment, GarmentSchema } from './entities/garment.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Garment.name, schema: GarmentSchema }]),
  ],
  controllers: [GarmentsController],
  providers: [GarmentsService],
})
export class GarmentsModule {}
