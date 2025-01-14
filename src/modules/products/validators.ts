import { defaultZodString, zodPositiveNumber } from '../../utils/zod';
import * as zod from 'zod';

export const postProductSchema = zod
  .object({
    name: defaultZodString,
    description: defaultZodString,
    price: zodPositiveNumber,
    stock: zodPositiveNumber,
  })
  .strict();
