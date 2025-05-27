import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userAuth = req.user;
    console.log('el req user', { userAuth });

    if (!userAuth)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? userAuth : userAuth[data];
  },
);
