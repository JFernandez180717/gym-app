import { ApiProperty } from "@nestjs/swagger";

export class AssingRoleModel {
    @ApiProperty()
    gym_id: number;
    @ApiProperty()
    id: number;
    @ApiProperty()
    user_email: string;
    @ApiProperty()
    role_id: string;
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