import { Product, ProductId, ProductPayload } from './schemas';
import { Logger } from '../../utils/logger';
import { IdUtils } from '../../utils/id.utils';
import { ProductCommands } from './repository/command';
import { ResourceLockedError, ResourceNotFoundError } from '../../error/errors';
import { ProductQueries } from './repository/query';

export class ProductsService {
  commands: ProductCommands;
  queries: ProductQueries;

  constructor() {
    this.commands = new ProductCommands();
    this.queries = new ProductQueries();
  }

  getProducts(): Promise<Product[]> {
    return this.queries.get();
  }

  createProduct = async (productPayload: ProductPayload): Promise<Product> => {
    const product: Product = {
      id: IdUtils.provideProductId(),
      createdAt: Date.now(),
      ...productPayload,
    };

    Logger.debug(`Creating product with id ${product.id}`);
    await this.commands.create(product);
    return product;
  };

  restockProduct = async (productId: ProductId): Promise<number> => {
    Logger.debug(`Restocking product with id ${productId}`);

    const stock = await this.commands.restock(productId);
    if (stock === null) {
      throw new ResourceNotFoundError(productId);
    }
    Logger.info(`Product ${productId} restocked. New stock: ${stock}`);
    return stock;
  };

  sellProduct = async (productId: ProductId): Promise<number> => {
    Logger.debug(`Selling product with id ${productId}`);

    const lockAcquired: boolean = await this.commands.acquireLock(productId);
    if (!lockAcquired) {
      throw new ResourceLockedError(productId);
    }

    try {
      const stock = await this.commands.sell(productId);
      if (stock === null) {
        throw new ResourceNotFoundError(productId);
      }
      Logger.info(`Product ${productId} sold. New stock: ${stock}`);
      return stock;
    } finally {
      await this.commands.releaseLock(productId);
    }
  };
}
