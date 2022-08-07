import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidatonError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidatonError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
