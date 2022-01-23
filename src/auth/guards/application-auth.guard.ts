import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../../common';
import { Observable } from 'rxjs';
/**
 * Guard는 각 미들웨어이 후에 실행되지만 인터셉터나 파이프는 앞에 실행됩니다.
 */
@Injectable()
export class ApplicationAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly logger: LoggerService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { timezone } = request.headers;
    request.headers.timezone = !timezone ? 'Asia/seoul' : timezone;

    return this.validateRequest(request);
  }
  private validateRequest(request: any) {
    const { headers } = request;
    if (headers.timezone) {
      return true;
    } else {
      throw new NotFoundException('not found timezone');
    }
  }
}
