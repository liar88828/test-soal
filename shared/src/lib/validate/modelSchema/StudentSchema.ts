import { z } from 'zod';
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// STUDENT PARTIAL SCHEMA
/////////////////////////////////////////

export const StudentPartialSchema = StudentSchema.partial()

export type StudentPartial = z.infer<typeof StudentPartialSchema>

/////////////////////////////////////////
// STUDENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const StudentOptionalDefaultsSchema = StudentSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
}))

export type StudentOptionalDefaults = z.infer<typeof StudentOptionalDefaultsSchema>

/////////////////////////////////////////
// STUDENT RELATION SCHEMA
/////////////////////////////////////////

export type StudentRelations = {
  answers: AnswerWithRelations[];
};

export type StudentWithRelations = z.infer<typeof StudentSchema> & StudentRelations

export const StudentWithRelationsSchema: z.ZodType<StudentWithRelations> = StudentSchema.merge(z.object({
  answers: z.lazy(() => AnswerWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// STUDENT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentOptionalDefaultsRelations = {
  answers: AnswerOptionalDefaultsWithRelations[];
};

export type StudentOptionalDefaultsWithRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentOptionalDefaultsRelations

export const StudentOptionalDefaultsWithRelationsSchema: z.ZodType<StudentOptionalDefaultsWithRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// STUDENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type StudentPartialRelations = {
  answers?: AnswerPartialWithRelations[];
};

export type StudentPartialWithRelations = z.infer<typeof StudentPartialSchema> & StudentPartialRelations

export const StudentPartialWithRelationsSchema: z.ZodType<StudentPartialWithRelations> = StudentPartialSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
})).partial()

export type StudentOptionalDefaultsWithPartialRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentPartialRelations

export const StudentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StudentOptionalDefaultsWithPartialRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export type StudentWithPartialRelations = z.infer<typeof StudentSchema> & StudentPartialRelations

export const StudentWithPartialRelationsSchema: z.ZodType<StudentWithPartialRelations> = StudentSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export default StudentSchema;
