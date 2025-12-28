import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

const prisma = new PrismaClient();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no requiere roles, dejar pasar
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.email) {
      throw new ForbiddenException('Usuario no autenticado o sin email en el token');
    }

    // Consultar roles asignados al usuario desde la BD
    const userRoles = await prisma.userRole.findMany({
      where: { user_email: user.email },
      select: { role_name: true },
    });
    
    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException('El usuario no tiene roles asignados');
    }

    const roles = userRoles.map((ur) => ur.role_name);

    const hasRole = requiredRoles.some((role) => roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('No tienes permiso para acceder a este recurso');
    }

    return true;
  }
}
