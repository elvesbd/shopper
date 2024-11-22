import { NotFoundException } from '@nestjs/common';

export class DriverNotFoundException extends NotFoundException {
  constructor() {
    super({
      error_code: 'DRIVER_NOT_FOUND',
      error_description: 'O motorista informado não foi encontrado!',
    });
  }
}
