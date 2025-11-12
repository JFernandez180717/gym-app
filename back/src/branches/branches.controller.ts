import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { CreateBranchModel } from './model/create-branch.model';

@Controller('branches')
export class BranchesController {
    constructor (private readonly branchesService: BranchesService) {}
    @Post()
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        type: ApiResponseModel(CreateBranchModel)
    })
    async create(@Body() data: CreateBranchDto) {
        return this.branchesService.create(data);
    }
}
