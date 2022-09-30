import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class RemoveBoardRequestDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 0 })
  id: number;
}
