import { callTestApp } from './call.test.app';
import { expect } from '@jest/globals';
import { HttpStatus } from '../src/utils/http.status';
import { Router } from 'express';
import { ErrorCode } from '../src/error/error.code';

type TestGetEndpointConfig = {
  validQuery: { [key: string]: unknown };
  invalidQueries: { [key: string]: { [key: string]: unknown } };
  invalidStatus?: HttpStatus;
  validStatus: HttpStatus;
  path: string;
  routers: Router[];
};

function buildQuery(query: { [key: string]: unknown }) {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

function testGetEndpoint(config: TestGetEndpointConfig) {
  describe(`GET ${config.path}`, () => {
    it(`should return ${config.validStatus} when valid query is provided`, async () => {
      const { status } = await callTestApp({
        expectedStatus: config.validStatus,
        method: 'get',
        path: `${config.path}?${buildQuery(config.validQuery)}`,
        routers: config.routers,
      });

      expect(status).toBe(config.validStatus);
    });

    for (const [description, invalidQuery] of Object.entries(config.invalidQueries)) {
      it(`should return ${config.invalidStatus} when ${description} query is provided`, async () => {
        const { body, status } = await callTestApp({
          expectedStatus: config.invalidStatus || HttpStatus.BAD_REQUEST,
          method: 'get',
          path: `${config.path}?${buildQuery(invalidQuery)}`,
          routers: config.routers,
        });

        expect(status).toBe(config.invalidStatus);
        expect(body.code).toStrictEqual(ErrorCode.INVALID_QUERY);
      });
    }
  });
}

export { testGetEndpoint, TestGetEndpointConfig };
