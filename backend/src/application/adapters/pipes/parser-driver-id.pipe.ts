import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDriverIdPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null) {
      return undefined;
    }

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException('Driver ID must be a valid number');
    }

    return parsedValue;
  }
}
