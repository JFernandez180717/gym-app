import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { CompaniesService } from 'src/companies/companies.service';

@Module({
  providers: [BranchesService, CompaniesService],
  controllers: [BranchesController]
})
export class BranchesModule {}
