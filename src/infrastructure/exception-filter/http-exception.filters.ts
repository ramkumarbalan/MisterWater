import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() ?? HttpStatus.BAD_REQUEST;
    const message =
      typeof exception === 'object'
        ? exception['response']
          ? exception['response']['message'].toString()
          : exception.message.toString()
        : exception;
    response.status(status).json({
      status,
      data: null,
      errors: message,
    });
  }
}
