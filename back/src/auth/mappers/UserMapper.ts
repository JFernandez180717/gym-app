import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserLoginResponseModel } from "../response/models/user-login-response.model";

@Injectable()
export class UserMapper {
  toDto(entity: User): UserLoginResponseModel {
    const dto = new UserLoginResponseModel();
    dto.company_id = entity.company_id;
    dto.branch_id = entity.branch_id;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.phone = entity.phoneNumber!;
    dto.status  = entity.status;

    return dto;
  }
}