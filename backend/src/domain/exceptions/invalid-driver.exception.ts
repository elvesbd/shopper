import { BadRequestException } from '@nestjs/common';

export class InvalidDriverException extends BadRequestException {
  constructor() {
    super({
      error_code: 'INVALID_DRIVER',
      error_description: 'O motorista informado é invalido!',
    });
  }
}
