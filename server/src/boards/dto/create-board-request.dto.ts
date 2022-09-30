import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoardRequestDto {
  @IsString()
  @ApiProperty({ example: '제목' })
  title: string;

  @IsString()
  @ApiProperty({ example: '내용' })
  content: string;
}
