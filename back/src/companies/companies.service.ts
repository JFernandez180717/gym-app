import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CompaniesService {
    async findUnique(companyId: number) {
        return await prisma.company.findUnique({ where: { id: companyId} });
    }

    async exists(companyId: number) {
        const company = await this.findUnique(companyId);
        if (!company) {
            return false;
        }
        return true;
    }
}
