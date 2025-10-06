import { z } from 'zod';

export const GradeScalarFieldEnumSchema = z.enum(['id','name','level','grade']);

export default GradeScalarFieldEnumSchema;
