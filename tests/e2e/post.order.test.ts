import { testPostEndpoint, TestPostEndpointConfig } from '../test.post.endpoint';
import { CustomerId, OrderPayload } from '../../src/modules/orders/schemas';
import { ProductId } from '../../src/modules/products/schemas';
import { HttpStatus } from '../../src/utils/http.status';
import { config } from '../../src/config';
import { ordersRouter } from '../../src/modules/orders/router';
import { Mongo } from '../../src/db/mongo';

describe(`POST /orders`, () => {
  const orderPayload: OrderPayload = {
    products: ['product-id' as ProductId],
    customer: 'customer-id' as CustomerId,
  };

  const postOrderConfig: TestPostEndpointConfig = {
    validBody: orderPayload,
    invalidBodies: {
      'missing products': {
        customer: orderPayload.customer,
      },
      'missing customer': {
        products: orderPayload.products,
      },
      'customer is not a string': {
        products: orderPayload.products,
        customer: 123,
      },
      'products is not an array': {
        products: 'product-id' as ProductId,
        customer: orderPayload.customer,
      },
    },
    validStatus: HttpStatus.CREATED,
    invalidStatus: HttpStatus.BAD_REQUEST,
    path: config.paths.orders,
    routers: [ordersRouter],
  };

  Mongo.ordersCollection = jest.fn().mockReturnValue({
    insertOne: jest.fn().mockResolvedValue({}),
  });

  Mongo.productsCollection = jest.fn().mockReturnValue({
    findOneAndUpdate: jest.fn().mockResolvedValue({ value: { stock: 0 } }),
    updateMany: jest.fn().mockResolvedValue({}),
  });

  testPostEndpoint(postOrderConfig);
});
