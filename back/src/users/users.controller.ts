import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { AssingRoleUser } from './dto/assign-role-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Roles('ADMIN')
    async findAll() {
        return this.usersService.findAll()
    }

    @Patch()
    @Roles('ADMIN')
    async assignRole(@Body() data: AssingRoleUser) {
        return this.usersService.assignRole(data);
    }
}
