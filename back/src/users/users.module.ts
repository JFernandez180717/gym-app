import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesService } from 'src/roles/roles.service';
import { CompaniesService } from 'src/companies/companies.service';

@Module({
  providers: [UsersService, CompaniesService, RolesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
