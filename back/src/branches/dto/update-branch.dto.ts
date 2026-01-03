import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBranchDto {
  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  phone?: string;
}