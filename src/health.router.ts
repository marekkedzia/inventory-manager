import { config } from './config';
import { Router, Response, Request } from 'express';

class HealthController {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.get(config.paths.health, this.getHealth);
  }

  getHealth(_: Request, res: Response) {
    return res.json({ status: 'UP' });
  }
}

export const healthRouter = new HealthController().router;
