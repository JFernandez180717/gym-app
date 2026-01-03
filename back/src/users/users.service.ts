import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AssingRoleUser } from './dto/assign-role-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Utils } from 'src/common/utils/utils.utils'; 
import { CompaniesService } from 'src/companies/companies.service';
import { BranchesService } from 'src/branches/branches.service';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly rolesService: RolesService, 
    private readonly branchesService: BranchesService
  ) {}

  async create(data: CreateUserDto) {
    if (!await this.companiesService.exists(data.companyId)) {
      throw new HttpException({ error: 'Empresa no encontrada'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.branchesService.exists(data.companyId, data.branchId)) {
      throw new HttpException({ error: 'Sede no encontrada'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date();
    try {
      return prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
          status: data.status,
          created_date: data.createdDate,
          company: {
            connect: { id: data.companyId },
          },
          branch: {
            connect: { 
              company_id_branch_id: {
                company_id: data.companyId,
                branch_id: data.branchId
              }
            }
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException({ error: 'El usuario ya existe'}, HttpStatus.CONFLICT);
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

  async findAll() {
    return prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({ 
      where: {
        email
      } 
    });
  }

  async assignRole(data: AssingRoleUser) {
    if (!await this.companiesService.exists(data.companyId)) {
      throw new HttpException({ error: 'Empresa no encontrado'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.branchesService.exists(data.companyId, data.branchId)) {
      throw new HttpException({ error: 'Sede no encontrada'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.rolesService.exists(data.companyId, data.branchId, data.roleName)) {
      throw new HttpException({ error: 'Rol no encontrado'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date()
    try {
      return prisma.userRole.create({
        data: {
          user_email: data.email,
          role_name: data.roleName,
          status: 1,
          created_date: data.createdDate,
          created_by: data.createdBy,
          company_id: data.companyId,
          branch_id: data.branchId,
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException({ error: 'El usuario ya tiene asignado el rol'}, HttpStatus.CONFLICT);
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

  async exists(email: string) {
    const user = this.findByEmail(email);
    if (!user) {
      return false;
    }
    return true;
  }

  async update(data: UpdateUserDto) {
    if (!await this.companiesService.exists(data.companyId)) {
      throw new HttpException({ error: 'Empresa no encontrado'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.branchesService.exists(data.companyId, data.branchId)) {
      throw new HttpException({ error: 'Sede no encontrada'}, HttpStatus.NOT_FOUND);
    }
    const user = await this.findByEmail(data.email);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (data.password !== undefined || !(await bcrypt.compare(data.password, user.password))) {
      throw new HttpException('La contraseña actual no es correcta.', HttpStatus.BAD_REQUEST);
    }
    prisma.user.update({
      where: {
        company_id_branch_id_email: {
          company_id: data.companyId,
          branch_id: data.branchId,
          email: data.email
        }
      },
      data: Utils.removeUndefined(data) 
    });
  }
}
