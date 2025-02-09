import * as zod from 'zod';
import { defaultZodId } from '../../utils/zod';

export const postOrderValidator = zod
  .object({
    products: zod.array(defaultZodId),
    customer: defaultZodId,
  })
  .strict();
