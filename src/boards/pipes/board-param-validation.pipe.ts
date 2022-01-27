import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class BoardParamValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;
    if (type === 'param') {
      value = Number(value);
      if(isNaN(value) || value < 0) {
        throw new BadRequestException(`The ${data} must be a positive number`)
      }
    }
    return value;
  }
}