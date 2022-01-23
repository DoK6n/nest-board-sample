import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserInfoResponseDto {
  @IsString()
  @ApiProperty({ example: 'success'})
  status: string;
  
  @IsString()
  @ApiProperty({ example: 'user & detail 생성 성공'})
  message: string;


  @IsInt()
  @ApiProperty({ example: 99, description: 'uuid' })
  id?: number;
}
