import { z } from 'zod';

export const TeacherScalarFieldEnumSchema = z.enum(['id','name','subject','phone','email','address','photo','gender','birthDate','createdAt']);

export default TeacherScalarFieldEnumSchema;
