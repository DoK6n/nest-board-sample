import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { isValidTimezone } from 'common/utils/timezone';
// header로 담겨온 timezone을 반환하여 API에 파라미터로 넘기는 커스텀 데코레이터
export const ClientTimezone = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (request.headers && request.headers.timezone) {
    const { timezone } = request.headers;
    if (!!isValidTimezone(timezone)) {
      return timezone;
    } else {
      throw new BadRequestException('Validation failed (timezone name is not correct)'); // TIMEZONE_VALIDATION_ERROR_MESSAGE
    }
  } else {
    throw new BadRequestException('Uncaught ReferenceError (property is not defined)'); // PROPERTY_REFERENCE_ERROR_MESSAGE
  }
});
