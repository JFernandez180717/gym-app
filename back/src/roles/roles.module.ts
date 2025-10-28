import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { GymModule } from 'src/gym/gym.module';
import { GymService } from 'src/gym/gym.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, GymService]
})
export class RolesModule {}
