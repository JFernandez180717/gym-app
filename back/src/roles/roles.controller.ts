import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { RoleModel } from './response/models/role.model';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import type { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

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
    async findAll(@ActiveUser() activeUser: ActiveUserInterface) {
      return this.rolesService.findAll(activeUser.companyId, activeUser.branchId);
    }

    @Get('status/:status')
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({
      type: ApiResponseModel(Array)
    })
    async findAllByStatus(@ActiveUser() activeUser: ActiveUserInterface, @Param('status') status: number) {
      return this.rolesService.findAllByStatus(activeUser.companyId, activeUser.branchId, status);
    }
}
