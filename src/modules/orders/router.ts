import { Router, Response, Request } from 'express';
import { OrdersService } from './service';
import { config } from '../../config';
import { Order } from './schemas';
import { postOrderValidator } from './validators';
import { validateBody } from '../../utils/validators';
import { HttpStatus } from '../../utils/http.status';

class OrdersRouter {
  router: Router;

  constructor(private service: OrdersService) {
    this.router = Router();

    this.router.post(config.paths.orders, validateBody(postOrderValidator), this.createOrder);
  }

  createOrder = async (req: Request, res: Response): Promise<Response<Order>> => {
    const order: Order = await this.service.createOrder(req.body);
    return res.status(HttpStatus.CREATED).json(order);
  };
}

export const ordersRouter = new OrdersRouter(new OrdersService()).router;
