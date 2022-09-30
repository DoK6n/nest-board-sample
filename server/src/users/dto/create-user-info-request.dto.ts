import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateUserInfoRequestDto {
  @IsString()
  @ApiProperty({ example: '우왁굳', description: '이름' })
  name: string;

  @IsInt()
  @Min(0)
  @Max(999)
  @ApiProperty({ example: 34, description: '나이' })
  age: number;

  @IsString()
  @ApiProperty({ example: 'twitch streamer', description: '상세 내용' })
  description: string;
}
