import { HttpStatus } from '../../src/utils/http.status';
import { testPostEndpoint, TestPostEndpointConfig } from '../test.post.endpoint';
import { config } from '../../src/config';
import { productsRouter } from '../../src/modules/products/router';
import { Mongo } from '../../src/db/mongo';

const validBody = {
  name: 'product-name',
  description: 'product-description',
  price: 10,
  stock: 10,
};

const invalidBodies = {
  'missing name': { ...validBody, name: undefined },
  'missing description': { ...validBody, description: undefined },
  'missing price': { ...validBody, price: undefined },
  'missing stock': { ...validBody, stock: undefined },
  'price is not a number': { ...validBody, price: '10' },
  'stock is not a number': { ...validBody, stock: '10' },
  'price is negative': { ...validBody, price: -10 },
  'stock is negative': { ...validBody, stock: -10 },
};

describe(`POST /products`, () => {
  const postProductConfig: TestPostEndpointConfig = {
    validBody,
    invalidBodies,
    validStatus: HttpStatus.CREATED,
    invalidStatus: HttpStatus.BAD_REQUEST,
    path: config.paths.products,
    routers: [productsRouter],
  };

  Mongo.productsCollection = jest.fn().mockReturnValue({
    insertOne: jest.fn().mockResolvedValue({}),
  });

  testPostEndpoint(postProductConfig);
});
