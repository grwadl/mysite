import { PartialType } from '@nestjs/mapped-types';
import { IsPositive } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsPositive()
  quantity?: number;
}
