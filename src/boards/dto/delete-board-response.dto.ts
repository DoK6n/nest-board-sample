import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { DataResponseDto } from './data-response.dto';

export class DeleteBoardResponseDto {
  @IsString()
  @ApiProperty({ example: 'success'})
  readonly status: string;
  
  @IsString()
  @ApiProperty({ example: '게시글 삭제 성공'})
  readonly message: string;

  @IsObject()
  @ApiProperty({ type: () => DataResponseDto })
  data: DataResponseDto;
}