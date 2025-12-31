import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserLoginResponseModel {
  @ApiProperty({ example: 1 })
  company_id: number;

  @ApiProperty({ example: 1 })
  branch_id: number;
  
  @ApiProperty({ example: 'example@example.com' })
  email: String;

  @ApiProperty({ example: 'Pepito' })
  firstName: String;

  @ApiProperty({ example: 'Perez' })
  lastName: String;

  @ApiProperty({ example: '3211234567' })
  phone: String;

  @ApiProperty({ example: 1 })
  status: number;
}