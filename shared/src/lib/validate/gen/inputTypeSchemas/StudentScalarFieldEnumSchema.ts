import { z } from 'zod';

export const StudentScalarFieldEnumSchema = z.enum(['id','name','email','userId','createdAt','updatedAt']);

export default StudentScalarFieldEnumSchema;
