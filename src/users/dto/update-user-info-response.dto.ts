import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserInfoResponseDto {
  @IsString()
  @ApiProperty({ example: 'success' })
  readonly status: string;

  @IsString()
  @ApiProperty({ example: '내 정보 수정 성공' })
  readonly message: string;
}
