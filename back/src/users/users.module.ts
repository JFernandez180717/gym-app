import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GymService } from 'src/gym/gym.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  providers: [UsersService, GymService, RolesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
