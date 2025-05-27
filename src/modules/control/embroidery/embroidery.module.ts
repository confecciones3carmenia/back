import { Module } from '@nestjs/common';
import { EmbroideryService } from './embroidery.service';
import { EmbroideryController } from './embroidery.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Embroidery, EmbroiderySchema } from './entities/embroidery.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Embroidery.name, schema: EmbroiderySchema },
    ]),
  ],
  controllers: [EmbroideryController],
  providers: [EmbroideryService],
})
export class EmbroideryModule {}
