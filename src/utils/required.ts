export const required = (key: string, variable?: string) => {
  if (!variable) {
    throw new Error(`[config error] Missing required environment variable: ${key}`);
  }

  return variable;
};
