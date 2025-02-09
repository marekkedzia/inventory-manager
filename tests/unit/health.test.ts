import { getApp } from '../../src/app';
import supertest from 'supertest';
import { HttpStatus } from '../../src/utils/http.status';
import { config } from '../../src/config';

describe('Health test', () => {
  const app = getApp({
    routers: [],
  });

  it('should get health', async () => {
    const response = await supertest(app).get(config.paths.health).send();
    expect(response.status).toBe(HttpStatus.OK);
  });
});
