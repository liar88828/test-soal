import { z } from 'zod';
import { StudentWithRelationsSchema, StudentPartialWithRelationsSchema, StudentOptionalDefaultsWithRelationsSchema } from './StudentSchema'
import type { StudentWithRelations, StudentPartialWithRelations, StudentOptionalDefaultsWithRelations } from './StudentSchema'
import { SoalItemWithRelationsSchema, SoalItemPartialWithRelationsSchema, SoalItemOptionalDefaultsWithRelationsSchema } from './SoalItemSchema'
import type { SoalItemWithRelations, SoalItemPartialWithRelations, SoalItemOptionalDefaultsWithRelations } from './SoalItemSchema'

/////////////////////////////////////////
// ANSWER SCHEMA
/////////////////////////////////////////

export const AnswerSchema = z.object({
  id: z.number().int(),
  studentId: z.number().int(),
  soalId: z.number().int(),
  soalItemId: z.number().int(),
  selected: z.string(),
  createdAt: z.date(),
})

export type Answer = z.infer<typeof AnswerSchema>

/////////////////////////////////////////
// ANSWER PARTIAL SCHEMA
/////////////////////////////////////////

export const AnswerPartialSchema = AnswerSchema.partial()

export type AnswerPartial = z.infer<typeof AnswerPartialSchema>

/////////////////////////////////////////
// ANSWER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AnswerOptionalDefaultsSchema = AnswerSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.date().optional(),
}))

export type AnswerOptionalDefaults = z.infer<typeof AnswerOptionalDefaultsSchema>

/////////////////////////////////////////
// ANSWER RELATION SCHEMA
/////////////////////////////////////////

export type AnswerRelations = {
  Student: StudentWithRelations;
  SoalItem: SoalItemWithRelations;
};

export type AnswerWithRelations = z.infer<typeof AnswerSchema> & AnswerRelations

export const AnswerWithRelationsSchema: z.ZodType<AnswerWithRelations> = AnswerSchema.merge(z.object({
  Student: z.lazy(() => StudentWithRelationsSchema),
  SoalItem: z.lazy(() => SoalItemWithRelationsSchema),
}))

/////////////////////////////////////////
// ANSWER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AnswerOptionalDefaultsRelations = {
  Student: StudentOptionalDefaultsWithRelations;
  SoalItem: SoalItemOptionalDefaultsWithRelations;
};

export type AnswerOptionalDefaultsWithRelations = z.infer<typeof AnswerOptionalDefaultsSchema> & AnswerOptionalDefaultsRelations

export const AnswerOptionalDefaultsWithRelationsSchema: z.ZodType<AnswerOptionalDefaultsWithRelations> = AnswerOptionalDefaultsSchema.merge(z.object({
  Student: z.lazy(() => StudentOptionalDefaultsWithRelationsSchema),
  SoalItem: z.lazy(() => SoalItemOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// ANSWER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type AnswerPartialRelations = {
  Student?: StudentPartialWithRelations;
  SoalItem?: SoalItemPartialWithRelations;
};

export type AnswerPartialWithRelations = z.infer<typeof AnswerPartialSchema> & AnswerPartialRelations

export const AnswerPartialWithRelationsSchema: z.ZodType<AnswerPartialWithRelations> = AnswerPartialSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalItem: z.lazy(() => SoalItemPartialWithRelationsSchema),
})).partial()

export type AnswerOptionalDefaultsWithPartialRelations = z.infer<typeof AnswerOptionalDefaultsSchema> & AnswerPartialRelations

export const AnswerOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AnswerOptionalDefaultsWithPartialRelations> = AnswerOptionalDefaultsSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalItem: z.lazy(() => SoalItemPartialWithRelationsSchema),
}).partial())

export type AnswerWithPartialRelations = z.infer<typeof AnswerSchema> & AnswerPartialRelations

export const AnswerWithPartialRelationsSchema: z.ZodType<AnswerWithPartialRelations> = AnswerSchema.merge(z.object({
  Student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalItem: z.lazy(() => SoalItemPartialWithRelationsSchema),
}).partial())

export default AnswerSchema;
