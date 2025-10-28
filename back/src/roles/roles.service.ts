import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { GymService } from 'src/gym/gym.service';

const prisma = new PrismaClient();

@Injectable()
export class RolesService {
    constructor(private readonly gymService: GymService) {}
    async create(data: CreateRoleDto){
        if (!await this.gymService.exists(data.gymId)) {
            throw new NotFoundException({ error: 'Gimnasio no encontrado'});
        }
        data.createdDate = new Date()
        return prisma.role.create({
            data: {
                role: data.role,
                description: data.description,
                status: 1,
                created_date: data.createdDate,
                created_by: data.createdBy,
                gym: {
                    connect: { id: data.gymId }
                }
            }
        });
    }
}
