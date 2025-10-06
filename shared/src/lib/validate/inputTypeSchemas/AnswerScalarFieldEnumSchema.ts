import { z } from 'zod';

export const AnswerScalarFieldEnumSchema = z.enum(['id','soalId','selected','createdAt','studentId','soalABCId','soalTextId']);

export default AnswerScalarFieldEnumSchema;
