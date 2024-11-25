import { IsNotEmpty, IsString } from 'class-validator';
import { IsDifferentFrom } from '@application/decorators';

export class RideEstimateRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'O id do usuário não pode estar em branco' })
  customer_id: string;

  @IsString()
  @IsNotEmpty({ message: 'A origem não pode estar em branco' })
  origin: string;

  @IsString()
  @IsNotEmpty({ message: 'O destino não pode estar em branco' })
  @IsDifferentFrom('origin', {
    message: 'Os endereços de origem e destino não podem ser o mesmo endereço',
  })
  destination: string;
}
