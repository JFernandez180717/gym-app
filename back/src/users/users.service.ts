import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AssingRoleUser } from './dto/assign-role-user.dto';
import * as bcrypt from 'bcrypt';
import { GymService } from 'src/gym/gym.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Utils } from 'src/common/utils/utils.utils'; 

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly gymService: GymService, private readonly rolesService: RolesService) {}
  async create(data: CreateUserDto) {
    if (!await this.gymService.exists(data.gymId)) {
      throw new HttpException({ error: 'Gimnasio no encontrado'}, HttpStatus.NOT_FOUND);
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
        gym: {
          connect: { id: data.gymId },
        },
      },
    });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async assignRole(data: AssingRoleUser) {
    if (!await this.gymService.exists(data.gymId)) {
      throw new HttpException({ error: 'Gimnasio no encontrado'}, HttpStatus.NOT_FOUND);
    }
    if (!await this.rolesService.exists(data.role_id)) {
      throw new HttpException({ error: 'Rol no encontrado'}, HttpStatus.NOT_FOUND);
    }
    data.createdDate = new Date()
    return prisma.userRole.create({
      data: {
        status: 1,
        created_date: data.createdDate,
        created_by: data.createdBy,
        gym: {
          connect: { id: data.gymId },
        },
        user: {
          connect: { email: data.email },
        },
        role: {
          connect: { role: data.role_id },
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
    if (!await this.exists(data.email)) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: { password: true }
    });
    if (data.password !== undefined || !(await bcrypt.compare(data.password, user?.password))) {
      throw new HttpException('La contraseña actual no es correcta.', HttpStatus.BAD_REQUEST);
    }
    prisma.user.update({
      where: {
        email: data.email
      },
      data: Utils.removeUndefined(data) 
    });
  }
}
