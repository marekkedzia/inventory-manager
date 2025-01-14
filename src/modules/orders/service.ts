import { Order, OrderPayload } from './schemas';
import { OrderCommands } from './repository/command';
import { ProductCommands } from '../products/repository/command';
import { IdUtils } from '../../utils/id.utils';
import { ResourceLockedError } from '../../error/errors';
import { ProductId } from '../products/schemas';

export class OrdersService {
  commands: OrderCommands;
  productCommands: ProductCommands;

  constructor() {
    this.commands = new OrderCommands();
    this.productCommands = new ProductCommands();
  }

  createOrder = async (orderPayload: OrderPayload): Promise<Order> => {
    const locksAcquired: ProductId[] = await this.productCommands.acquireLocksIfStockAvailable(
      orderPayload.products,
    );
    if (locksAcquired.length !== orderPayload.products.length) {
      throw new ResourceLockedError(orderPayload.products);
    }

    try {
      const order: Order = {
        id: IdUtils.provideOrderId(),
        createdAt: Date.now(),
        ...orderPayload,
      };

      await this.commands.create(order);
      await Promise.all(
        orderPayload.products.map(async (productId) => {
          await this.productCommands.sell(productId);
        }),
      );

      return order;
    } finally {
      await this.productCommands.releaseLocks(locksAcquired);
    }
  };
}
