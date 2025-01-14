import { HttpStatus } from '../utils/http.status';
import { ErrorCode } from './error.code';
import { ErrorData } from './error.data';

export interface AppError {
  status: number;
  code?: ErrorCode;
  data?: string | ErrorData;
}

export class InternalError implements AppError {
  status = HttpStatus.INTERNAL_SERVER_ERROR;
  code = ErrorCode.INTERNAL_SERVER_ERROR;
  data = ErrorData.INTERNAL_SERVER_ERROR;
}

export class InvalidBodyError implements AppError {
  status = HttpStatus.BAD_REQUEST;
  code = ErrorCode.INVALID_BODY;
  data;

  constructor(message: string) {
    this.data = `${ErrorData.INVALID_BODY}: ${message}`;
  }
}

export class InvalidQueryError implements AppError {
  status = HttpStatus.BAD_REQUEST;
  code = ErrorCode.INVALID_QUERY;
  data;

  constructor(message: string) {
    this.data = `${ErrorData.INVALID_QUERY}: ${message}`;
  }
}

export class ResourceNotFoundError implements AppError {
  status = HttpStatus.NOT_FOUND;
  code = ErrorCode.RESOURCE_NOT_FOUND;
  data;

  constructor(resourceId: string) {
    this.data = `Resource with id ${resourceId} not found`;
  }
}

export class ResourceLockedError implements AppError {
  status = HttpStatus.CONFLICT;
  code = ErrorCode.RESOURCE_LOCKED;
  data;

  constructor(resourceId: string | string[]) {
    this.data = `${ErrorData.RESOURCE_LOCKED}: { id: ${typeof resourceId === 'string' ? resourceId : resourceId.join(', ')} }`;
  }
}
