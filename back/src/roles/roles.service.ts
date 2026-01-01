import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { BranchesService } from 'src/branches/branches.service';

const prisma = new PrismaClient();

@Injectable()
export class RolesService {
  constructor(
    private readonly companiesService: CompaniesService, 
    private readonly branchesService: BranchesService
  ) {}

  async create(data: CreateRoleDto){
    if (!await this.companiesService.exists(data.companyId)) {
      throw new NotFoundException({ error: 'Empresa no encontrado'});
    }
    if (!await this.branchesService.exists(data.companyId, data.branchId)) {
      throw new HttpException({ error: 'Sede no encontrada'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date()
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException({ error: 'El rol ya existe'}, HttpStatus.CONFLICT);
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

  async findAll(companyId: number, branchId: number) {
    
    return await prisma.role.findMany({
      where: {
        company_id: companyId,
        branch_id: branchId
      }
    });    
  }

  async findAllByStatus(companyId: number, branchId: number, status: number) {
    return await prisma.role.findMany({
      where: {
        company_id: companyId,
        branch_id: branchId,
        status: status
      }
    });
  }
}
