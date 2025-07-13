import { z } from 'zod';

export const SoalScalarFieldEnumSchema = z.enum(['id','name','author','createdAt','updatedAt']);

export default SoalScalarFieldEnumSchema;
