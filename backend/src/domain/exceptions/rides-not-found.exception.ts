import { NotFoundException } from '@nestjs/common';

export class RidesNotFoundException extends NotFoundException {
  constructor() {
    super({
      error_code: 'NO_RIDES_FOUND',
      error_description: 'Nenhum registro encontrado!',
    });
  }
}
