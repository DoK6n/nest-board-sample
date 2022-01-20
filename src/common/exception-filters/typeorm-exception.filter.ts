import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { LoggerService } from '../logger/logger.service';
import { TypeOrmErrorCode } from '../enums';
// typeorm용 예외필터
@Catch(QueryFailedError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name, message } = exception;
    const errorResponse = {
      error: name,
      message,
      path: url,
      timestamp: new Date().toISOString(),
    };

    const failedQueryHandler = (): Response => {
      const code = message.substring(0, message.indexOf(':'));
      const errorCode = Object.values(TypeOrmErrorCode).find(err => err === code);

      switch (errorCode) {
        case TypeOrmErrorCode.DUPLICATE_KEY:
          return response.status(HttpStatus.CONFLICT).json(errorResponse);
        case TypeOrmErrorCode.NO_REFERENCED_ROW:
          return response.status(HttpStatus.NOT_ACCEPTABLE).json(errorResponse);
        case TypeOrmErrorCode.DATA_TOO_LONG:
        case TypeOrmErrorCode.NULL_NOT_ALLOWED:
        case TypeOrmErrorCode.OUT_OF_RANGE:
          return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errorResponse);
        default:
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
      }
    };

    this.logger.error(message, JSON.stringify(errorResponse), TypeOrmExceptionFilter.name);

    switch (exception.constructor) {
      case QueryFailedError:
        return failedQueryHandler();
      case EntityNotFoundError:
        return response.status(HttpStatus.NOT_FOUND).json(errorResponse);
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
