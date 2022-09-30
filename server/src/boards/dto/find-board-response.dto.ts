import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindBoardResponseDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: '글번호' })
  readonly id: number;

  @IsString()
  @ApiProperty({ example: '제목2', description: '글제목' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: '내용2', description: '글내용' })
  readonly content: string;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: '작성자' })
  readonly insertId: string;

  @IsString()
  @ApiProperty({ example: '2021-11-17T11:27:32.000Z', description: '작성일자'})
  readonly insertDt: string;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: '수정자' })
  readonly updateId: string;

  @IsString()
  @ApiProperty({ example: '2021-11-17T12:18:27.000Z', description: '수정일자' })
  readonly updateDt: string;
}