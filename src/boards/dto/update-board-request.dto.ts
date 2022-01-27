import { PartialType } from '@nestjs/swagger';
import { CreateBoardRequestDto } from './create-board-request.dto';

export class UpdateBoardRequestDto extends PartialType(CreateBoardRequestDto) {}