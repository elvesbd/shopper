import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

interface CustomErrorResponse {
  error_code?: string;
  error_description?: string;
  message?: string | string[];
  statusCode?: number;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const responseBody = exception.getResponse() as CustomErrorResponse;
    console.log(responseBody);

    if (responseBody.error_code) {
      return response.status(400).json(responseBody);
    }

    const formattedError = {
      error_code: 'INVALID_DATA',
      error_description: Array.isArray(responseBody.message)
        ? responseBody.message[0]
        : responseBody.message || 'Dados inválidos',
    };

    return response.status(responseBody.statusCode).json(formattedError);
  }
}
