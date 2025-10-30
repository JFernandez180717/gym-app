import { ApiProperty } from "@nestjs/swagger";

export class GetUserModel {
    @ApiProperty()
    gym_id: number;
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
    created_date: Date;
    @ApiProperty()
    modified_date: Date;
    @ApiProperty()
    created_by: string;
    @ApiProperty()
    modified_by: string;
}