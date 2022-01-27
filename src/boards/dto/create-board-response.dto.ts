import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

class DataResponseDto {
  @IsNumber()
  @ApiProperty({ example: 73, description: '작성자' })
  readonly writer: number;

  @IsNumber()
  @ApiProperty({ example: 9, description: '글번호' })
  readonly boardNum: number;
}

export class CreateBoardResponseDto {
  @IsString()
  @ApiProperty({ example: 'success' })
  readonly status: string;
  
  @IsString()
  @ApiProperty({ example: '게시글 등록 성공'})
  readonly message: string;

  @IsObject()
  @ApiProperty({ type: () => DataResponseDto })
  readonly data: DataResponseDto;
}