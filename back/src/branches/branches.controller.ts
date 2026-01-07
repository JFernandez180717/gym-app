import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { CreateBranchModel } from './model/create-branch.model';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import type { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
export class BranchesController {
    constructor (private readonly branchesService: BranchesService) {}

    @Get()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({
      status: 200,
      type: ApiResponseModel(Array)
    })
    async findAll(@ActiveUser() activeUser: ActiveUserInterface) {
      return this.branchesService.findAll(activeUser.companyId);
    }

    @Post()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        type: ApiResponseModel(CreateBranchModel)
    })
    async create(@ActiveUser() activeUser: ActiveUserInterface, @Body() data: CreateBranchDto) {
        return this.branchesService.create(activeUser.companyId, data);
    }

    @Put(':id')
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({
      status: 200,
    })
    async update(@ActiveUser() activeUser: ActiveUserInterface, @Body() data: UpdateBranchDto, @Param('id') id: number) {
      await this.branchesService.update(activeUser.companyId, id, data, activeUser.email);
    }
}
