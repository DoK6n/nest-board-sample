import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
/**
 * export interface ArgumentMetadata {
      type: 'body' | 'query' | 'param' | 'custom';
      metatype?: Type<unknown>;
      data?: string;
  }
 */
export class UserParamValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;
    if (type === 'param') {
      value = Number(value);
      console.log(value);
      if (isNaN(value) || value <= 0) {
        throw new BadRequestException(`The ${data} must be a positive number`);
      }
    }
    return value;
  }
}
