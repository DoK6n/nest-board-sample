import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsObject } from 'class-validator';

class DetailResponseDto {
  @IsString()
  @ApiProperty({ example: 'twitch streamer', description: '상세 정보' })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: 'uuid' })
  readonly insertId: string;

  @IsString()
  @ApiProperty({ example: '2022-01-23T19:50:05.000Z', description: '생성날짜' })
  readonly insertDt: string;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: '수정한 uuid' })
  readonly updateId: string;

  @IsString()
  @ApiProperty({ example: '2022-01-23T19:51:05.000Z', description: '수정날짜' })
  readonly updateDt: string;
}

export class UserInfoResponseDto {
  @IsString()
  @ApiProperty({ example: '우왁굳', description: '이름' })
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(999)
  @ApiProperty({ example: 34, description: '나이' })
  readonly age: number;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: 'uuid' })
  readonly insertId: string;

  @IsString()
  @ApiProperty({ example: '2022-01-23T19:50:00.000Z', description: '생성날짜' })
  readonly insertDt: string;

  @IsString()
  @ApiProperty({ example: 'c5022070-7c33-11ec-b3e9-55576f1317c0', description: '수정한 uuid' })
  readonly updateId: string;

  @IsString()
  @ApiProperty({ example: '2022-01-23T19:51:00.000Z', description: '생성날짜' })
  readonly updateDt: string;

  @IsObject()
  @ApiProperty({ type: () => DetailResponseDto })
  detail: DetailResponseDto;
}
