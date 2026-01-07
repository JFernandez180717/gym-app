import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Utils } from 'src/common/utils/utils.utils';

const prisma = new PrismaClient();

@Injectable()
export class BranchesService {
    constructor(private readonly companiesService: CompaniesService) {}

    async findAll(companyId: number) {
      return await prisma.branch.findMany({
        where: {
          company_id: companyId
        }
      });
    }

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

    async create(companyId: number, data: CreateBranchDto) {
      try {
        return prisma.$transaction(async (tx) => {
          const lastBranch = await tx.branch.findFirst({
            where: { company_id: companyId },
            orderBy: { branch_id: 'desc' },
            select: { branch_id: true },
          });

          const nextBranchNumber = (lastBranch?.branch_id || 0) + 1;

          const newBranch = await tx.branch.create({
            data: {
              branch_id: nextBranchNumber,
              address: data.address,
              phone: data.phone,
              status: 1,
              created_date: new Date(),
              created_by: data.createdBy,
              company: {
                connect: { id: companyId }
              }
            }
          });

          return newBranch;
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002':
              throw new HttpException({ error: 'La sede ya existe.'}, HttpStatus.CONFLICT);
            case 'P2003':
              throw new HttpException({ error: 'Referencia inválida'}, HttpStatus.BAD_REQUEST);
            case 'P2011':
              throw new HttpException({ error: 'Campos requeridos faltantes'}, HttpStatus.BAD_REQUEST);
            case 'P2012':
              throw new HttpException({ error: 'Faltan campos requeridos'}, HttpStatus.BAD_REQUEST);
            default:
              throw new HttpException({ error: `Error de base de datos: ${error.code}`}, HttpStatus.BAD_REQUEST);
          }
        } else if (error instanceof Prisma.PrismaClientValidationError) {
          throw new HttpException({ error: 'Datos de entrada inválidos'}, HttpStatus.BAD_REQUEST);
        } else {
          console.error('Error inesperado:', error);
          throw new HttpException({ error: 'Error inesperado'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }

    async update(companyId: number, branchId: number, data: UpdateBranchDto, userEmail: string) {
      if (!this.exists(companyId, branchId) || (!data.address && !data.phone)) throw new BadRequestException('Datos de entrada inválidos.');      
      await prisma.branch.update({
        where: {
          company_id_branch_id: {
            company_id: companyId,
            branch_id: branchId
          }
        },
        data: {
          ...Utils.removeUndefined(data),
          modified_by: userEmail,
          modified_date: new Date()
        }
      });
    }
}
