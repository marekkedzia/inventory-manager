import { HttpStatus } from '../../src/utils/http.status';
import { testPostEndpoint, TestPostEndpointConfig } from '../test.post.endpoint';
import { config } from '../../src/config';
import { productsRouter } from '../../src/modules/products/router';
import { Mongo } from '../../src/db/mongo';

const validBody = {};

const invalidBodies = {
  'non-empty body': { someField: 'someValue' },
};

describe(`POST /products/:id/restock`, () => {
  const restockProductConfig: TestPostEndpointConfig = {
    validBody,
    invalidBodies,
    validStatus: HttpStatus.CREATED,
    invalidStatus: HttpStatus.BAD_REQUEST,
    path: `${config.paths.products}/:id/restock`,
    routers: [productsRouter],
  };

  Mongo.productsCollection = jest.fn().mockReturnValue({
    updateOne: jest.fn().mockResolvedValue({}),
  });
  testPostEndpoint(restockProductConfig);
});

describe(`POST /products/:id/sell`, () => {
  const sellProductConfig: TestPostEndpointConfig = {
    validBody,
    invalidBodies,
    validStatus: HttpStatus.CREATED,
    invalidStatus: HttpStatus.BAD_REQUEST,
    path: `${config.paths.products}/:id/sell`,
    routers: [productsRouter],
  };

  Mongo.productsCollection = jest.fn().mockReturnValue({
    findOneAndUpdate: jest.fn().mockResolvedValue({ value: { stock: 0 } }),
    updateOne: jest.fn().mockResolvedValue({}),
  });

  testPostEndpoint(sellProductConfig);
});
