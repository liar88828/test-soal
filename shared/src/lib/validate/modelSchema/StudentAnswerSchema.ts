import { z } from 'zod';
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'

/////////////////////////////////////////
// STUDENT ANSWER SCHEMA
/////////////////////////////////////////

export const StudentAnswerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
})

export type StudentAnswer = z.infer<typeof StudentAnswerSchema>

/////////////////////////////////////////
// STUDENT ANSWER PARTIAL SCHEMA
/////////////////////////////////////////

export const StudentAnswerPartialSchema = StudentAnswerSchema.partial()

export type StudentAnswerPartial = z.infer<typeof StudentAnswerPartialSchema>

/////////////////////////////////////////
// STUDENT ANSWER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const StudentAnswerOptionalDefaultsSchema = StudentAnswerSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
}))

export type StudentAnswerOptionalDefaults = z.infer<typeof StudentAnswerOptionalDefaultsSchema>

/////////////////////////////////////////
// STUDENT ANSWER RELATION SCHEMA
/////////////////////////////////////////

export type StudentAnswerRelations = {
  answers: AnswerWithRelations[];
};

export type StudentAnswerWithRelations = z.infer<typeof StudentAnswerSchema> & StudentAnswerRelations

export const StudentAnswerWithRelationsSchema: z.ZodType<StudentAnswerWithRelations> = StudentAnswerSchema.merge(z.object({
  answers: z.lazy(() => AnswerWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// STUDENT ANSWER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentAnswerOptionalDefaultsRelations = {
  answers: AnswerOptionalDefaultsWithRelations[];
};

export type StudentAnswerOptionalDefaultsWithRelations = z.infer<typeof StudentAnswerOptionalDefaultsSchema> & StudentAnswerOptionalDefaultsRelations

export const StudentAnswerOptionalDefaultsWithRelationsSchema: z.ZodType<StudentAnswerOptionalDefaultsWithRelations> = StudentAnswerOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// STUDENT ANSWER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type StudentAnswerPartialRelations = {
  answers?: AnswerPartialWithRelations[];
};

export type StudentAnswerPartialWithRelations = z.infer<typeof StudentAnswerPartialSchema> & StudentAnswerPartialRelations

export const StudentAnswerPartialWithRelationsSchema: z.ZodType<StudentAnswerPartialWithRelations> = StudentAnswerPartialSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
})).partial()

export type StudentAnswerOptionalDefaultsWithPartialRelations = z.infer<typeof StudentAnswerOptionalDefaultsSchema> & StudentAnswerPartialRelations

export const StudentAnswerOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StudentAnswerOptionalDefaultsWithPartialRelations> = StudentAnswerOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export type StudentAnswerWithPartialRelations = z.infer<typeof StudentAnswerSchema> & StudentAnswerPartialRelations

export const StudentAnswerWithPartialRelationsSchema: z.ZodType<StudentAnswerWithPartialRelations> = StudentAnswerSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export default StudentAnswerSchema;
