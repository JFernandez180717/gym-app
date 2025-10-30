import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { CreateRoleModel } from './response/models/create-role.model';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({ 
        type: ApiResponseModel(CreateRoleModel)
     })
    async create(@Body() data: CreateRoleDto) {
        return this.rolesService.create(data);
    }
}
