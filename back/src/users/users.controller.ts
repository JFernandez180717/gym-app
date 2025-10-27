import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Roles('ADMIN')
    async findAll() {
        return this.usersService.findAll()
    }
}
