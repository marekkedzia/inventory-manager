import { HttpStatus } from '../../src/utils/http.status';
import { testGetEndpoint, TestGetEndpointConfig } from '../test.get.endpoint';
import { config } from '../../src/config';
import { productsRouter } from '../../src/modules/products/router';
import { Mongo } from '../../src/db/mongo';

const validQuery = {};

const invalidQueries = {
  'non-empty query': { someField: 'someValue' },
};

describe(`GET /products`, () => {
  const getProductsConfig: TestGetEndpointConfig = {
    validQuery,
    invalidQueries,
    validStatus: HttpStatus.OK,
    invalidStatus: HttpStatus.BAD_REQUEST,
    path: config.paths.products,
    routers: [productsRouter],
  };

  Mongo.productsCollection = jest.fn().mockReturnValue({
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue([]),
    }),
  });

  testGetEndpoint(getProductsConfig);
});
