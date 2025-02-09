import { NextFunction, Request, Response } from 'express';
import { AppError, InternalError } from './errors';
import { InternalStorage } from '../internal.storage/internal.storage';
import { HttpStatus } from '../utils/http.status';
import { Logger } from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: Error | AppError, _: Request, response: Response, __: NextFunction) {
  const status = (error as AppError).status || HttpStatus.INTERNAL_SERVER_ERROR;

  const res =
    status !== HttpStatus.INTERNAL_SERVER_ERROR
      ? {
          code: (error as AppError).code,
          data: (error as AppError).data,
        }
      : new InternalError();

  const id = InternalStorage.getRequestId();
  const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
  Logger.error(`Error in request ${id}: ${errorMessage}`);

  response.status(status).json({ ...res, id });
}

export { errorHandler };
