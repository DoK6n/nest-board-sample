import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  constructor(context?: string) {
    super(context);
  }

  info(message: string, context?: string): void {
    super.log(message, context);
  }

  debug(message: string, context?: string): void {
    if (process.env.NODE_ENV === 'development') {
      super.debug(message, context);
    }
  }

  error(message: string, trace = '', context?: string): void {
    super.error(message, trace, context);
  }

  infoEC2Task(message: string, instanceId?: string, context?: string): void {
    super.verbose(`RUN ${message}`, `${context} ➜ ${instanceId}`);
  }
}
