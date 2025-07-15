import { z } from 'zod';

export const SoalScalarFieldEnumSchema = z.enum(['id','name','author','subjects','createdAt','updatedAt']);

export default SoalScalarFieldEnumSchema;
