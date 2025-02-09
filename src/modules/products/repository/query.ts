import { Mongo } from '../../../db/mongo';
import { Product } from '../schemas';
import { Document, WithId } from 'mongodb';

export class ProductQueries {
  async get(): Promise<Product[]> {
    const productDocuments: WithId<Document>[] = await Mongo.productsCollection().find().toArray();
    return productDocuments.map(this.mapDocument);
  }

  private mapDocument(product: Document): Product {
    return {
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    };
  }
}
