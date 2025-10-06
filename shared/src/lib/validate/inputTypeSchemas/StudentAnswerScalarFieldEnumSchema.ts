import { z } from 'zod';

export const StudentAnswerScalarFieldEnumSchema = z.enum(['id','name','email','createdAt']);

export default StudentAnswerScalarFieldEnumSchema;
