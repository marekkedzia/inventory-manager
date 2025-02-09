const paths = {
  health: '/health',
  products: '/products',
  orders: '/orders',
};

const server = {
  port: process.env.PORT || 3000,
};

const config = {
  paths,
  server,
  strings: {
    minLength: 1,
    maxLength: 50,
  },
};

export { config };
