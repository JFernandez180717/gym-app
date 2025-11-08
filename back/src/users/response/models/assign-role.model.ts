import { ApiProperty } from "@nestjs/swagger";

export class AssingRoleModel {
    @ApiProperty()
    companyId: number;
    @ApiProperty()
    branchId: number;
    @ApiProperty()
    id: number;
    @ApiProperty()
    userEmail: string;
    @ApiProperty()
    roleId: string;
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