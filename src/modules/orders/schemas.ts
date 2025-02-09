import Opaque from 'ts-opaque';
import { DatabaseEntity } from '../../utils/database.entity';
import { ProductId } from '../products/schemas';

export type Order = OrderPayload & DatabaseEntity<OrderId>;

export type OrderPayload = {
  products: ProductId[];
  customer: CustomerId;
};

export type OrderId = Opaque<string, 'order'>;
export type CustomerId = Opaque<string, 'customer'>;
