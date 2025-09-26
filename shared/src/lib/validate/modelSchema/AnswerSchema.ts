import { z } from 'zod';
import type { StudentOptionalDefaultsWithRelations, StudentPartialWithRelations, StudentWithRelations } from './StudentSchema'
import { StudentOptionalDefaultsWithRelationsSchema, StudentPartialWithRelationsSchema, StudentWithRelationsSchema } from './StudentSchema'
import type { SoalABCOptionalDefaultsWithRelations, SoalABCPartialWithRelations, SoalABCWithRelations } from './SoalABCSchema'
import { SoalABCOptionalDefaultsWithRelationsSchema, SoalABCPartialWithRelationsSchema, SoalABCWithRelationsSchema } from './SoalABCSchema'
import type { SoalTextOptionalDefaultsWithRelations, SoalTextPartialWithRelations, SoalTextWithRelations } from './SoalTextSchema'
import { SoalTextOptionalDefaultsWithRelationsSchema, SoalTextPartialWithRelationsSchema, SoalTextWithRelationsSchema } from './SoalTextSchema'

/////////////////////////////////////////
// ANSWER SCHEMA
/////////////////////////////////////////

export const AnswerSchema = z.object({
  id: z.number().int(),
  soalId: z.number().int(),
  selected: z.string(),
  createdAt: z.date(),
  studentId: z.number().int(),
  soalABCId: z.number().int().nullish(),
  soalTextId: z.number().int().nullish(),
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
  student: StudentWithRelations;
  SoalABC?: SoalABCWithRelations | null;
  SoalText?: SoalTextWithRelations | null;
};

export type AnswerWithRelations = z.infer<typeof AnswerSchema> & AnswerRelations

export const AnswerWithRelationsSchema: z.ZodType<AnswerWithRelations> = AnswerSchema.merge(z.object({
  student: z.lazy(() => StudentWithRelationsSchema),
  SoalABC: z.lazy(() => SoalABCWithRelationsSchema).nullish(),
  SoalText: z.lazy(() => SoalTextWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// ANSWER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AnswerOptionalDefaultsRelations = {
  student: StudentOptionalDefaultsWithRelations;
  SoalABC?: SoalABCOptionalDefaultsWithRelations | null;
  SoalText?: SoalTextOptionalDefaultsWithRelations | null;
};

export type AnswerOptionalDefaultsWithRelations = z.infer<typeof AnswerOptionalDefaultsSchema> & AnswerOptionalDefaultsRelations

export const AnswerOptionalDefaultsWithRelationsSchema: z.ZodType<AnswerOptionalDefaultsWithRelations> = AnswerOptionalDefaultsSchema.merge(z.object({
  student: z.lazy(() => StudentOptionalDefaultsWithRelationsSchema),
  SoalABC: z.lazy(() => SoalABCOptionalDefaultsWithRelationsSchema).nullish(),
  SoalText: z.lazy(() => SoalTextOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// ANSWER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type AnswerPartialRelations = {
  student?: StudentPartialWithRelations;
  SoalABC?: SoalABCPartialWithRelations | null;
  SoalText?: SoalTextPartialWithRelations | null;
};

export type AnswerPartialWithRelations = z.infer<typeof AnswerPartialSchema> & AnswerPartialRelations

export const AnswerPartialWithRelationsSchema: z.ZodType<AnswerPartialWithRelations> = AnswerPartialSchema.merge(z.object({
  student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).nullish(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).nullish(),
})).partial()

export type AnswerOptionalDefaultsWithPartialRelations = z.infer<typeof AnswerOptionalDefaultsSchema> & AnswerPartialRelations

export const AnswerOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AnswerOptionalDefaultsWithPartialRelations> = AnswerOptionalDefaultsSchema.merge(z.object({
  student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).nullish(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).nullish(),
}).partial())

export type AnswerWithPartialRelations = z.infer<typeof AnswerSchema> & AnswerPartialRelations

export const AnswerWithPartialRelationsSchema: z.ZodType<AnswerWithPartialRelations> = AnswerSchema.merge(z.object({
  student: z.lazy(() => StudentPartialWithRelationsSchema),
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).nullish(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).nullish(),
}).partial())

export default AnswerSchema;
