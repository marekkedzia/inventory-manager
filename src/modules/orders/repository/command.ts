import { Order } from '../schemas';
import { Mongo } from '../../../db/mongo';

export class OrderCommands {
  async create(order: Order): Promise<void> {
    await Mongo.ordersCollection().insertOne(order);
  }
}
