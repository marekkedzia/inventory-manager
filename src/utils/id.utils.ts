import { Opaque } from 'ts-opaque';
import { randomUUID } from 'crypto';
import { OrderId } from '../modules/orders/schemas';
import { ProductId } from '../modules/products/schemas';

type RequestId = Opaque<string, 'requestId'>;

class IdUtils {
  protected static provideId<T>(prefix: string, suffixLength = 6): T {
    return `${prefix}_${Date.now()}_${randomUUID().slice(0, suffixLength)}` as T;
  }

  public static provideRequestId = (): RequestId => IdUtils.provideId<RequestId>('req');
  public static provideProductId = (): ProductId => IdUtils.provideId<ProductId>('prod');
  public static provideOrderId = (): OrderId => IdUtils.provideId<OrderId>('ord');
}

export { RequestId, IdUtils };
