import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CompaniesService {
    async findUnique(companyId: number) {
        return prisma.company.findUnique({ where: { id: companyId} });
    }

    async exists(companyId: number) {
        const company = this.findUnique(companyId);
        if (!company) {
            return false;
        }
        return true;
    }
}
