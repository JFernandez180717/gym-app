import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { RoleModel } from './response/models/role.model';
import type { Request } from 'express';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({ 
        type: ApiResponseModel(RoleModel)
     })
    async create(@Body() data: CreateRoleDto) {
        return this.rolesService.create(data);
    }

    @Get()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({ 
        type: ApiResponseModel(Array)
     })
    async findAll(@Req() req: Request) {
      const token = req.cookies.auth_token;      
      return this.rolesService.findAll(token!);
    }
}
