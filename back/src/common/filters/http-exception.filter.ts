import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../response/api-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Si es una excepción conocida (HttpException)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as
        | { message?: string | string[]; error?: string }
        | string;

      let message = 'Error interno';
      let errors: string[] = [];

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = exceptionResponse.error || 'Error en la solicitud';
        errors = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message || ''];
      }

      return response
        .status(status)
        .json(ApiResponse.fail(message, errors));
    }

    // Si es un error no controlado
    console.error('Unhandled error:', exception);

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        ApiResponse.fail('Error interno del servidor', [
          (exception as any)?.message || 'Error desconocido',
        ]),
      );
  }
}
