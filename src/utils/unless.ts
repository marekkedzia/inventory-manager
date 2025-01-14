import { Request, Response, NextFunction } from 'express';

const unless =
  (paths: string[], middleware: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) =>
    paths.includes(req.path) ? next() : middleware(req, res, next);

export { unless };
