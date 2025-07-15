import { z } from 'zod';
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'
import { StudentSubjectsWithRelationsSchema, StudentSubjectsPartialWithRelationsSchema, StudentSubjectsOptionalDefaultsWithRelationsSchema } from './StudentSubjectsSchema'
import type { StudentSubjectsWithRelations, StudentSubjectsPartialWithRelations, StudentSubjectsOptionalDefaultsWithRelations } from './StudentSubjectsSchema'
import { UserWithRelationsSchema, UserPartialWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserPartialWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
  updatedAt: z.date().optional(),
}))

export type StudentOptionalDefaults = z.infer<typeof StudentOptionalDefaultsSchema>

/////////////////////////////////////////
// STUDENT RELATION SCHEMA
/////////////////////////////////////////

export type StudentRelations = {
  answers: AnswerWithRelations[];
  StudentSubjects: StudentSubjectsWithRelations[];
  User?: UserWithRelations | null;
};

export type StudentWithRelations = z.infer<typeof StudentSchema> & StudentRelations

export const StudentWithRelationsSchema: z.ZodType<StudentWithRelations> = StudentSchema.merge(z.object({
  answers: z.lazy(() => AnswerWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsWithRelationsSchema).array(),
  User: z.lazy(() => UserWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// STUDENT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentOptionalDefaultsRelations = {
  answers: AnswerOptionalDefaultsWithRelations[];
  StudentSubjects: StudentSubjectsOptionalDefaultsWithRelations[];
  User?: UserOptionalDefaultsWithRelations | null;
};

export type StudentOptionalDefaultsWithRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentOptionalDefaultsRelations

export const StudentOptionalDefaultsWithRelationsSchema: z.ZodType<StudentOptionalDefaultsWithRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsOptionalDefaultsWithRelationsSchema).array(),
  User: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// STUDENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type StudentPartialRelations = {
  answers?: AnswerPartialWithRelations[];
  StudentSubjects?: StudentSubjectsPartialWithRelations[];
  User?: UserPartialWithRelations | null;
};

export type StudentPartialWithRelations = z.infer<typeof StudentPartialSchema> & StudentPartialRelations

export const StudentPartialWithRelationsSchema: z.ZodType<StudentPartialWithRelations> = StudentPartialSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
})).partial()

export type StudentOptionalDefaultsWithPartialRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentPartialRelations

export const StudentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StudentOptionalDefaultsWithPartialRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
}).partial())

export type StudentWithPartialRelations = z.infer<typeof StudentSchema> & StudentPartialRelations

export const StudentWithPartialRelationsSchema: z.ZodType<StudentWithPartialRelations> = StudentSchema.merge(z.object({
  answers: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
}).partial())

export default StudentSchema;
