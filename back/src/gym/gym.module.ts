import { Module } from '@nestjs/common';
import { GymService } from './gym.service';

@Module({
  providers: [GymService]
})
export class GymModule {}
