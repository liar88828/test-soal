import { z } from 'zod';

export const StudentScalarFieldEnumSchema = z.enum(['id','name','email','createdAt']);

export default StudentScalarFieldEnumSchema;
