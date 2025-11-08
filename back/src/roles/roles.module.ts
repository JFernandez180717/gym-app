import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CompaniesService } from 'src/companies/companies.service';
import { BranchesService } from 'src/branches/branches.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, CompaniesService, BranchesService]
})
export class RolesModule {}
