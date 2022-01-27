import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUserInfoResponseDto {
  @IsString()
  @ApiProperty({ example: 'success'})
  readonly status: string;
  
  @IsString()
  @ApiProperty({ example: '유저 정보 삭제 성공'})
  readonly message: string;
}
