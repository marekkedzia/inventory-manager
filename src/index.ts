import { getApp } from './app';
import { Logger } from './utils/logger';
import { productsRouter } from './modules/products/router';
import { ordersRouter } from './modules/orders/router';
import { config } from './config';

const app = getApp({
  routers: [productsRouter, ordersRouter],
});

app.listen(config.server.port, () => {
  Logger.info(`Server started on port ${config.server.port}`);
});
