import { z } from 'zod';

export const ClassesScalarFieldEnumSchema = z.enum(['id','section','room','idTeacher','nameTeacher','idGrade']);

export default ClassesScalarFieldEnumSchema;
