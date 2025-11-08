import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CompaniesService } from 'src/companies/companies.service';

const prisma = new PrismaClient();

@Injectable()
export class BranchesService {
    constructor(private readonly companiesService: CompaniesService) {}

    async findByIdBranch(companyId: number, branchId: number) {
        return await prisma.branch.findUnique({
            where: {
                company_id_branch_id: {
                    company_id: companyId,
                    branch_id: branchId
                }
            }
        });
    }

    async exists(companyId: number, branchId: number) {
        const branch = this.findByIdBranch(companyId, branchId);
        if (!branch) {
            return false;
        }
        return true;
    }
}
