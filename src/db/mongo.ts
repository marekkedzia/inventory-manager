import { Db, MongoClient } from 'mongodb';

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (Mongo.client = c))
      .then((c) => (Mongo.mongo = c.db()))
      .then((db) => db);

  public static close = () => Mongo.client.close();
  public static productsCollection = () => Mongo.mongoCollection('products');
  public static ordersCollection = () => Mongo.mongoCollection('orders');

  private static mongoCollection = (name: string) => Mongo.mongo.collection(name);
}
