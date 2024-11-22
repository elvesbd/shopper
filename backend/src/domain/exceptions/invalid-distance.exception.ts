import { BadRequestException } from '@nestjs/common';

export class InvalidDistanceException extends BadRequestException {
  constructor(distance: number) {
    const distanceInKm = (distance / 1000).toFixed(2);

    super({
      error_code: 'INVALID_DISTANCE',
      error_description: `A distância informada (${distanceInKm} km) é inválida para o motorista selecionado!`,
    });
  }
}
