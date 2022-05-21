import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  public localizedMessage: Record<string, string>;
  public details: string | Record<string, any>;

  constructor(
    message: string,
    status: number,
    details?: string | Record<string, any>,
    localizedMessage?: Record<string, string>,
  ) {
    // Calling parent constructor of base Exception class.
    super(message, status);
    this.name = ApiException.name;
    this.localizedMessage = localizedMessage;
    this.details = details;
  }
}
