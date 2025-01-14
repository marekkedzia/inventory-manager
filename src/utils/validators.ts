import { ZodError, ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { InvalidBodyError, InvalidQueryError } from '../error/errors';

const validateBody = (schema: ZodSchema) => (req: Request, _: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error: unknown) {
    throw new InvalidBodyError(JSON.stringify({ ...(error as ZodError).issues }));
  }
};
const validateQuery = (schema: ZodSchema) => (req: Request, _: Response, next: NextFunction) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (error: unknown) {
    throw new InvalidQueryError(JSON.stringify({ ...(error as ZodError).issues }));
  }
};

export { validateBody, validateQuery };
