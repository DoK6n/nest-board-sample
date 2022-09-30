import { PartialType } from '@nestjs/swagger';
import { CreateUserInfoRequestDto } from '.';

// PartialType: 동일한 필드를 사용하되 각 필드가 Optional인 타입으로 만듦
export class UpdateUserInfoRequestDto extends PartialType(CreateUserInfoRequestDto) {}
