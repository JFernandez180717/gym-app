import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AssingRoleUser } from './dto/assign-role-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Utils } from 'src/common/utils/utils.utils'; 
import { CompaniesService } from 'src/companies/companies.service';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly companiesService: CompaniesService, private readonly rolesService: RolesService) {}
  async create(data: CreateUserDto) {
    if (!await this.companiesService.exists(data.companyId)) {
      throw new HttpException({ error: 'Empresa no encontrada'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date();
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
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
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  async assignRole(data: AssingRoleUser) {
    if (!await this.companiesService.exists(data.companyId)) {
      throw new HttpException({ error: 'Empresa no encontrado'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.rolesService.exists(data.role_id)) {
      throw new HttpException({ error: 'Rol no encontrado'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date()
    return prisma.userRole.create({
      data: {
        user_email: data.email,
        role_name: 'ADMIN',
        status: 1,
        created_date: data.createdDate,
        created_by: data.createdBy,
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
        user: {
          connect: { 
            company_id_branch_id_email: {
              company_id: 1,
              branch_id: 1,
              email: data.email
            }
          },
        },
        role: {
          connect: { 
            company_id_branch_id_role: {
              company_id: 1,
              branch_id: 1,
              role: data.role_id 
            }
          },
        }
      }
    });
  }

  async exists(email: string) {
    const user = this.findByEmail(email);
    if (!user) {
      return false;
    }
    return true;
  }

  async update(data: UpdateUserDto) {
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
          company_id: 1,
          branch_id: 1,
          email: data.email
        }
      },
      data: Utils.removeUndefined(data) 
    });
  }
}
