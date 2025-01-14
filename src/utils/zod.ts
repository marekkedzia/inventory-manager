import * as zod from 'zod';
import { config } from '../config';

export const defaultZodString = zod
  .string()
  .min(config.strings.minLength)
  .max(config.strings.maxLength);

export const defaultZodId = zod.string().min(config.strings.minLength);
export const zodPositiveNumber = zod.number().min(0);
export const emptyObjectSchema = zod.object({}).strict();
