import { ApiProperty } from "@nestjs/swagger";

export class GetUserModel {
    @ApiProperty()
    companyId: number;
    @ApiProperty()
    branchId: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    phoneNumber: string;
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