import { z } from 'zod';

export const AnswerScalarFieldEnumSchema = z.enum(['id','studentId','soalId','soalItemId','selected','createdAt']);

export default AnswerScalarFieldEnumSchema;
