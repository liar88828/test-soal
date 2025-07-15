import { z } from 'zod';
import { StudentWithRelationsSchema, StudentPartialWithRelationsSchema, StudentOptionalDefaultsWithRelationsSchema } from './StudentSchema'
import type { StudentWithRelations, StudentPartialWithRelations, StudentOptionalDefaultsWithRelations } from './StudentSchema'
import { SoalWithRelationsSchema, SoalPartialWithRelationsSchema, SoalOptionalDefaultsWithRelationsSchema } from './SoalSchema'
import type { SoalWithRelations, SoalPartialWithRelations, SoalOptionalDefaultsWithRelations } from './SoalSchema'

/////////////////////////////////////////
// STUDENT SUBJECTS SCHEMA
/////////////////////////////////////////

export const StudentSubjectsSchema = z.object({
  id: z.number().int(),
  studentId: z.number().int(),
  soalId: z.number().int(),
  createdAt: z.date(),
})

export type StudentSubjects = z.infer<typeof StudentSubjectsSchema>

/////////////////////////////////////////
// STUDENT SUBJECTS PARTIAL SCHEMA
/////////////////////////////////////////

export const StudentSubjectsPartialSchema = StudentSubjectsSchema.partial()

export type StudentSubjectsPartial = z.infer<typeof StudentSubjectsPartialSchema>

/////////////////////////////////////////
// STUDENT SUBJECTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const StudentSubjectsOptionalDefaultsSchema = StudentSubjectsSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
}))

export type StudentSubjectsOptionalDefaults = z.infer<typeof StudentSubjectsOptionalDefaultsSchema>

/////////////////////////////////////////
// STUDENT SUBJECTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentSubjectsRelations = {
  Student: StudentWithRelations;
  Soal: SoalWithRelations;
};

export type StudentSubjectsWithRelations = z.infer<typeof StudentSubjectsSchema> & StudentSubjectsRelations

export const StudentSubjectsWithRelationsSchema: z.ZodType<StudentSubjectsWithRelations> = StudentSubjectsSchema.merge(z.object({
  Student: z.lazy(() => StudentWithRelationsSchema),
  Soal: z.lazy(() => SoalWithRelationsSchema),
}))

/////////////////////////////////////////
// STUDENT SUBJECTS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentSubjectsOptionalDefaultsRelations = {
  Student: StudentOptionalDefaultsWithRelations;
  Soal: SoalOptionalDefaultsWithRelations;
};

export type StudentSubjectsOptionalDefaultsWithRelations = z.infer<typeof StudentSubjectsOptionalDefaultsSchema> & StudentSubjectsOptionalDefaultsRelations

export const StudentSubjectsOptionalDefaultsWithRelationsSchema: z.ZodType<StudentSubjectsOptionalDefaultsWithRelations> = StudentSubjectsOptionalDefaultsSchema.merge(z.object({
  Student: z.lazy(() => StudentOptionalDefaultsWithRelationsSchema),
  Soal: z.lazy(() => SoalOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// STUDENT SUBJECTS PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type StudentSubjectsPartialRelations = {
  Student?: StudentPartialWithRelations;
  Soal?: SoalPartialWithRelations;
};

export type StudentSubjectsPartialWithRelations = z.infer<typeof StudentSubjectsPartialSchema> & StudentSubjectsPartialRelations

export const StudentSubjectsPartialWithRelationsSchema: z.ZodType<StudentSubjectsPartialWithRelations> = StudentSubjectsPartialSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
})).partial()

export type StudentSubjectsOptionalDefaultsWithPartialRelations = z.infer<typeof StudentSubjectsOptionalDefaultsSchema> & StudentSubjectsPartialRelations

export const StudentSubjectsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StudentSubjectsOptionalDefaultsWithPartialRelations> = StudentSubjectsOptionalDefaultsSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export type StudentSubjectsWithPartialRelations = z.infer<typeof StudentSubjectsSchema> & StudentSubjectsPartialRelations

export const StudentSubjectsWithPartialRelationsSchema: z.ZodType<StudentSubjectsWithPartialRelations> = StudentSubjectsSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export default StudentSubjectsSchema;
