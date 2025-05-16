import { HttpException, HttpStatus } from '@nestjs/common';

export class ExternalApiException extends HttpException {
  constructor(message: string = 'External API error', status: number = HttpStatus.BAD_GATEWAY) {
    super(message, status);
  }
}
