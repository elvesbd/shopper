import {
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsDifferentFrom } from '@application/decorators';

class Driver {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class RideConfirmRequestDto {
  @IsNumber()
  value: number;

  @IsNotEmpty()
  origin: string;

  @ValidateNested()
  @Type(() => Driver)
  driver: Driver;

  @IsNumber()
  distance: number;

  @IsString()
  duration: string;

  @IsString()
  @IsNotEmpty()
  @IsDifferentFrom('origin', {
    message: 'Os endereços de origem e destino não podem ser o mesmo endereço',
  })
  destination: string;

  @IsString()
  @IsNotEmpty({ message: 'O id do usuário não pode estar em branco' })
  customer_id: string;
}
