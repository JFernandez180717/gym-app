import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchModel {
    @ApiProperty()
    companyId: number;
    @ApiProperty()
    branchId: number;
    @ApiProperty()
    address: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    createdDate: Date;
    @ApiProperty()
    modifiedDate: Date;
    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    modifiedBy: string;
}