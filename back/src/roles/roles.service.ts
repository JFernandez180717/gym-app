import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { BranchesService } from 'src/branches/branches.service';

const prisma = new PrismaClient();

@Injectable()
export class RolesService {
    constructor(private readonly companiesService: CompaniesService, private readonly branchesService: BranchesService) {}
    async create(data: CreateRoleDto){
        if (!await this.companiesService.exists(data.companyId)) {
            throw new NotFoundException({ error: 'Empresa no encontrado'});
        }
        if (!await this.branchesService.exists(data.companyId, data.branchId)) {
            throw new HttpException({ error: 'Sede no encontrada'}, HttpStatus.NOT_FOUND);
        }
        data.createdDate = new Date()
        return prisma.role.create({
            data: {
                role: data.role,
                description: data.description,
                status: 1,
                created_date: data.createdDate,
                created_by: data.createdBy,
                company: {
                    connect: { id: data.companyId }
                },
                branch: {
                    connect: {
                        company_id_branch_id: {
                            company_id: data.companyId,
                            branch_id: data.branchId
                        }
                    }
                }
            }
        });
    }

    async exists(companyId: number, branchId: number, roleName: string) {
        const role = await prisma.role.findUnique({ 
            where: { 
                company_id_branch_id_role: {
                    company_id: companyId,
                    branch_id: branchId,
                    role: roleName
                }
            } 
        });
        if (!role) {
            return false;
        }
        return true;
    }
}
