import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AssingRoleUser } from './dto/assign-role-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(data: CreateUserDto) {
    const gym = await prisma.gym.findUnique({ where: { id: data.gymId } });
    if (!gym) {
      return null;
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
    const gym = await prisma.gym.findUnique({ where: { id: data.gymId } });
    if (!gym) {
      return null;
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
}
