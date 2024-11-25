import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const responseBody = exception.getResponse();

    const formattedError = {
      error_code: 'INVALID_DATA',
      error_description: responseBody['message'][0],
    };

    return response.status(400).json(formattedError);
  }
}
