import { Product, ProductId } from '../schemas';
import { Mongo } from '../../../db/mongo';

export class ProductCommands {
  async create(product: Product): Promise<void> {
    await Mongo.productsCollection().insertOne(product);
  }

  async acquireLock(productId: ProductId): Promise<boolean> {
    const result = await Mongo.productsCollection().findOneAndUpdate(
      { id: productId, lock: { $ne: true } },
      { $set: { lock: true } },
      { returnDocument: 'after' },
    );

    return result?.value !== null;
  }

  async acquireLocksIfStockAvailable(productIds: ProductId[]): Promise<ProductId[]> {
    const acquired: ProductId[] = [];
    for (const productId of productIds) {
      const result = await Mongo.productsCollection().findOneAndUpdate(
        { id: productId, lock: { $ne: true }, stock: { $gt: 0 } },
        { $set: { lock: true } },
        { returnDocument: 'after' },
      );

      if (result?.value) {
        acquired.push(productId);
      }
    }

    return acquired;
  }

  async releaseLocks(productIds: ProductId[]): Promise<void> {
    await Mongo.productsCollection().updateMany(
      { id: { $in: productIds } },
      { $set: { lock: false } },
    );
  }

  async releaseLock(productId: ProductId): Promise<void> {
    await Mongo.productsCollection().updateOne({ id: productId }, { $set: { lock: false } });
  }

  async restock(productId: ProductId): Promise<number | null> {
    const result = await Mongo.productsCollection().findOneAndUpdate(
      { id: productId },
      { $inc: { stock: 1 } },
      { returnDocument: 'after' },
    );

    return result?.value ? result.value.stock : null;
  }

  async sell(productId: ProductId): Promise<number | null> {
    const result = await Mongo.productsCollection().findOneAndUpdate(
      { id: productId, stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
      { returnDocument: 'after' },
    );

    return result?.value ? result.value.stock : null;
  }
}
