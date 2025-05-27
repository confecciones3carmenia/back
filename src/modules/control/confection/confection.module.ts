import { Module } from '@nestjs/common';
import { ConfectionService } from './confection.service';
import { ConfectionController } from './confection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfectionSchema } from './entities/confection.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Confection', schema: ConfectionSchema },
    ]),
  ],
  controllers: [ConfectionController],
  providers: [ConfectionService],
})
export class ConfectionModule {}
