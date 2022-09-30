import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
// header로 담겨온 uid 반환하여 API에 파라미터로 넘기는 커스텀 데코레이터
export const UserUid = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (request.headers && request.headers.uid) {
    const { uid } = request.headers;
    return uid;
  } else {
    throw new BadRequestException(`You should include property name 'uid' in headers`);
  }
});
