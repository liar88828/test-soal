import { z } from 'zod';
import { SoalItemWithRelationsSchema, SoalItemPartialWithRelationsSchema, SoalItemOptionalDefaultsWithRelationsSchema } from './SoalItemSchema'
import type { SoalItemWithRelations, SoalItemPartialWithRelations, SoalItemOptionalDefaultsWithRelations } from './SoalItemSchema'
import { StudentSubjectsWithRelationsSchema, StudentSubjectsPartialWithRelationsSchema, StudentSubjectsOptionalDefaultsWithRelationsSchema } from './StudentSubjectsSchema'
import type { StudentSubjectsWithRelations, StudentSubjectsPartialWithRelations, StudentSubjectsOptionalDefaultsWithRelations } from './StudentSubjectsSchema'

/////////////////////////////////////////
// SOAL SCHEMA
/////////////////////////////////////////

export const SoalSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  author: z.string(),
  subjects: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Soal = z.infer<typeof SoalSchema>

/////////////////////////////////////////
// SOAL PARTIAL SCHEMA
/////////////////////////////////////////

export const SoalPartialSchema = SoalSchema.partial()

export type SoalPartial = z.infer<typeof SoalPartialSchema>

/////////////////////////////////////////
// SOAL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SoalOptionalDefaultsSchema = SoalSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type SoalOptionalDefaults = z.infer<typeof SoalOptionalDefaultsSchema>

/////////////////////////////////////////
// SOAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalRelations = {
  list: SoalItemWithRelations[];
  StudentSubjects: StudentSubjectsWithRelations[];
};

export type SoalWithRelations = z.infer<typeof SoalSchema> & SoalRelations

export const SoalWithRelationsSchema: z.ZodType<SoalWithRelations> = SoalSchema.merge(z.object({
  list: z.lazy(() => SoalItemWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SoalOptionalDefaultsRelations = {
  list: SoalItemOptionalDefaultsWithRelations[];
  StudentSubjects: StudentSubjectsOptionalDefaultsWithRelations[];
};

export type SoalOptionalDefaultsWithRelations = z.infer<typeof SoalOptionalDefaultsSchema> & SoalOptionalDefaultsRelations

export const SoalOptionalDefaultsWithRelationsSchema: z.ZodType<SoalOptionalDefaultsWithRelations> = SoalOptionalDefaultsSchema.merge(z.object({
  list: z.lazy(() => SoalItemOptionalDefaultsWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalPartialRelations = {
  list?: SoalItemPartialWithRelations[];
  StudentSubjects?: StudentSubjectsPartialWithRelations[];
};

export type SoalPartialWithRelations = z.infer<typeof SoalPartialSchema> & SoalPartialRelations

export const SoalPartialWithRelationsSchema: z.ZodType<SoalPartialWithRelations> = SoalPartialSchema.merge(z.object({
  list: z.lazy(() => SoalItemPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
})).partial()

export type SoalOptionalDefaultsWithPartialRelations = z.infer<typeof SoalOptionalDefaultsSchema> & SoalPartialRelations

export const SoalOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SoalOptionalDefaultsWithPartialRelations> = SoalOptionalDefaultsSchema.merge(z.object({
  list: z.lazy(() => SoalItemPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
}).partial())

export type SoalWithPartialRelations = z.infer<typeof SoalSchema> & SoalPartialRelations

export const SoalWithPartialRelationsSchema: z.ZodType<SoalWithPartialRelations> = SoalSchema.merge(z.object({
  list: z.lazy(() => SoalItemPartialWithRelationsSchema).array(),
  StudentSubjects: z.lazy(() => StudentSubjectsPartialWithRelationsSchema).array(),
}).partial())

export default SoalSchema;
