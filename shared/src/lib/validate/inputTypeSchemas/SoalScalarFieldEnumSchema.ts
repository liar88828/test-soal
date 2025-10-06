import { z } from 'zod';

export const SoalScalarFieldEnumSchema = z.enum(['id','nameSubject','author','createdAt','updatedAt']);

export default SoalScalarFieldEnumSchema;
