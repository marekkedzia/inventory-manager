import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import { IdUtils, RequestId } from '../utils/id.utils';
import { StorageContext } from './storage.context';
import { getOrThrow } from '../utils/get.or.throw';
import { InternalError } from '../error/errors';

class InternalStorage {
  private static localStorage = new AsyncLocalStorage<StorageContext>();

  static startStorage = (_: Request, __: Response, next: NextFunction): void => {
    this.localStorage.enterWith({
      requestId: IdUtils.provideRequestId(),
    });

    next();
  };

  static getRequestId = (): RequestId =>
    getOrThrow(this.localStorage.getStore(), new InternalError()).requestId;
}

export { InternalStorage };
