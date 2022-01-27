import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

class DataResponseDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  readonly boardNum: number;
}

export class UpdateBoardResponseDto {
  @IsString()
  @ApiProperty({ example: 'success'})
  readonly status: string;
  
  @IsString()
  @ApiProperty({ example: '게시글 수정 성공'})
  readonly message: string;
  
  @IsObject()
  @ApiProperty({ type: () => DataResponseDto })
  data: DataResponseDto;
}