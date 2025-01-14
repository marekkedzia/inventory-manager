import Opaque from 'ts-opaque';
import { DatabaseEntity } from '../../utils/database.entity';

export type Product = ProductPayload & DatabaseEntity<ProductId>;

export type ProductPayload = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

export type ProductId = Opaque<string, 'product'>;
