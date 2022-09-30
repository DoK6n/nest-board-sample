import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
/**
 * Nest에는 애플리케이션 전체에서 처리되지 않은 모든 예외를 처리하는 예외 레이어가 내장되어 있습니다.
 * 애플리케이션 코드에서 예외를 처리하지 않으면 이 레이어에서 예외를 포착하여 적절한 사용자 친화적인 응답을 자동으로 보냅니다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { method, url } = request;
    const status = exception.getStatus();
    const error = exception.message;
    const message = `${method} ${url} [Status: ${status}]`;
    const errorResponse = {
      statusCode: status,
      path: url,
      timestamp: new Date().toISOString(),
      error,
    };

    this.logger.error(message, JSON.stringify(errorResponse), HttpExceptionFilter.name);

    response.status(status).json(errorResponse);
  }
}
