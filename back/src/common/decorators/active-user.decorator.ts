import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

export const ActiveUser = createParamDecorator(
  (data: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserInterface = request.user;

    return data ? user?.[data] : user;
  },
);