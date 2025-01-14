import { callTestApp } from './call.test.app';
import { expect } from '@jest/globals';
import { HttpStatus } from '../src/utils/http.status';
import { Router } from 'express';
import { ErrorCode } from '../src/error/error.code';

type TestPostEndpointConfig = {
  validBody: { [key: string]: unknown };
  invalidBodies: { [key: string]: { [key: string]: unknown } };
  invalidStatus?: HttpStatus;
  validStatus: HttpStatus;
  path: string;
  routers: Router[];
};

function testPostEndpoint(config: TestPostEndpointConfig) {
  describe(`POST ${config.path}`, () => {
    it(`should return ${config.validStatus} when valid body is provided`, async () => {
      const { status } = await callTestApp({
        expectedStatus: config.validStatus,
        method: 'post',
        path: config.path,
        routers: config.routers,
        body: config.validBody,
      });

      expect(status).toBe(config.validStatus);
    });

    for (const [description, invalidBody] of Object.entries(config.invalidBodies)) {
      it(`should return ${config.invalidStatus} when ${description} body is provided`, async () => {
        const { body, status } = await callTestApp({
          expectedStatus: config.invalidStatus || HttpStatus.BAD_REQUEST,
          method: 'post',
          path: config.path,
          routers: config.routers,
          body: invalidBody,
        });

        expect(status).toBe(config.invalidStatus);
        expect(body.code).toStrictEqual(ErrorCode.INVALID_BODY);
      });
    }
  });
}

export { testPostEndpoint, TestPostEndpointConfig };
