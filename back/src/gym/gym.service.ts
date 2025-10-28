import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GymService {
    async findUnique(gymId: number) {
        return prisma.gym.findUnique({ where: { id: gymId} });
    }

    async exists(gymId: number) {
        const gym = this.findUnique(gymId);
        if (!gym) {
            return false;
        }
        return true;
    }
}
