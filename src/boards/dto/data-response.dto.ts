import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DataResponseDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  readonly boardNum: number;
}