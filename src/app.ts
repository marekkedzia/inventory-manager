import express, { Express, Router } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { healthRouter } from './health.router';
import { unless } from './utils/unless';
import { InternalStorage } from './internal.storage/internal.storage';
import { errorHandler } from './error/error.handler';
import { HttpStatus } from './utils/http.status';
import { Logger } from './utils/logger';

type AppConfig = {
  cors?: string;
  routers: Router[];
  auth?: {
    middleware: express.RequestHandler;
    unless: string[];
  }[];
};

function getApp(config?: AppConfig): Express {
  const app = express();
  const authMiddleware: express.RequestHandler[] =
    config?.auth?.map((a) => unless(a.unless, a.middleware)) || [];

  app
    .disable('x-powered-by')
    .use(cors(config?.cors ? { origin: config.cors } : {}))
    .use(express.json())
    .use((req, _, next) => {
      Logger.debug(`${req.method} ${req.path}`);
      next();
    })
    .use(InternalStorage.startStorage)
    .use(healthRouter);

  authMiddleware.forEach((middleware) => app.use(middleware));
  config?.routers.forEach((router) => app.use(router));

  app.use(errorHandler).use((_, res) => res.sendStatus(HttpStatus.NOT_FOUND));

  return app;
}

export { getApp };
