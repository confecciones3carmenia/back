import { Module } from '@nestjs/common';
import { StampedService } from './stamped.service';
import { StampedController } from './stamped.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stamped, StampedSchema } from './entities/stamped.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Stamped.name, schema: StampedSchema }]),
  ],
  controllers: [StampedController],
  providers: [StampedService],
})
export class StampedModule {}
