import { ApiProperty } from "@nestjs/swagger";

export class RoleModel {
    @ApiProperty()
    company_id: number;
    @ApiProperty()
    branch_id: number;
    @ApiProperty()
    role: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    created_date: Date;
    @ApiProperty()
    modified_date: Date;
    @ApiProperty()
    created_by: string;
    @ApiProperty()
    modified_by: string;
}