import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { AssingRoleUser } from './dto/assign-role-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GetUserModel } from 'src/users/response/models/get-users.model';
import { AssingRoleModel } from './response/models/assign-role.model';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: ApiResponseModel(GetUserModel)
    })
    @ApiBearerAuth()
    @Roles('ADMIN')
    async findAll() {
        return this.usersService.findAll()
    }

    @Post()
    @Roles('ADMIN')
    @ApiResponse({
        status: 201,
        type: ApiResponseModel(AssingRoleModel)
    })
    @ApiBearerAuth()
    async assignRole(@Body() data: AssingRoleUser) {
        return this.usersService.assignRole(data);
    }
}
