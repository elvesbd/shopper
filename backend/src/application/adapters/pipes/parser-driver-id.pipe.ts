import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDriverIdPipe implements PipeTransform {
  transform(value: any): number | undefined {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      isNaN(Number(value))
    ) {
      return undefined;
    }

    const parsedValue = parseInt(value, 10);

    return parsedValue;
  }
}
