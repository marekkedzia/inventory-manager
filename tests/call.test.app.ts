import { Router } from 'express';
import supertest from 'supertest';
import { HttpStatus } from '../src/utils/http.status';
import { getApp } from '../src/app';

type TestCallConfig = {
  routers: Router[];
  path: string;
  expectedStatus: HttpStatus;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: { [key: string]: unknown };
};

function callTestApp(config: TestCallConfig) {
  return supertest(
    getApp({
      routers: config.routers,
    }),
  )
    [config.method](config.path)
    .send(config.body)
    .expect(config.expectedStatus);
}

export { callTestApp, TestCallConfig };
