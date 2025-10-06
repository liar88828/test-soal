import { z } from 'zod';
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'
import { SoalWithRelationsSchema, SoalPartialWithRelationsSchema, SoalOptionalDefaultsWithRelationsSchema } from './SoalSchema'
import type { SoalWithRelations, SoalPartialWithRelations, SoalOptionalDefaultsWithRelations } from './SoalSchema'

/////////////////////////////////////////
// SOAL ABC SCHEMA
/////////////////////////////////////////

export const SoalABCSchema = z.object({
  id: z.number().int(),
  question: z.string(),
  A: z.string(),
  B: z.string(),
  C: z.string(),
  D: z.string(),
  E: z.string(),
  answer: z.string(),
  idSoal: z.number().int(),
})

export type SoalABC = z.infer<typeof SoalABCSchema>

/////////////////////////////////////////
// SOAL ABC PARTIAL SCHEMA
/////////////////////////////////////////

export const SoalABCPartialSchema = SoalABCSchema.partial()

export type SoalABCPartial = z.infer<typeof SoalABCPartialSchema>

/////////////////////////////////////////
// SOAL ABC OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SoalABCOptionalDefaultsSchema = SoalABCSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type SoalABCOptionalDefaults = z.infer<typeof SoalABCOptionalDefaultsSchema>

/////////////////////////////////////////
// SOAL ABC RELATION SCHEMA
/////////////////////////////////////////

export type SoalABCRelations = {
  Answer: AnswerWithRelations[];
  Soal: SoalWithRelations;
};

export type SoalABCWithRelations = z.infer<typeof SoalABCSchema> & SoalABCRelations

export const SoalABCWithRelationsSchema: z.ZodType<SoalABCWithRelations> = SoalABCSchema.merge(z.object({
  Answer: z.lazy(() => AnswerWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalWithRelationsSchema),
}))

/////////////////////////////////////////
// SOAL ABC OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SoalABCOptionalDefaultsRelations = {
  Answer: AnswerOptionalDefaultsWithRelations[];
  Soal: SoalOptionalDefaultsWithRelations;
};

export type SoalABCOptionalDefaultsWithRelations = z.infer<typeof SoalABCOptionalDefaultsSchema> & SoalABCOptionalDefaultsRelations

export const SoalABCOptionalDefaultsWithRelationsSchema: z.ZodType<SoalABCOptionalDefaultsWithRelations> = SoalABCOptionalDefaultsSchema.merge(z.object({
  Answer: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// SOAL ABC PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalABCPartialRelations = {
  Answer?: AnswerPartialWithRelations[];
  Soal?: SoalPartialWithRelations;
};

export type SoalABCPartialWithRelations = z.infer<typeof SoalABCPartialSchema> & SoalABCPartialRelations

export const SoalABCPartialWithRelationsSchema: z.ZodType<SoalABCPartialWithRelations> = SoalABCPartialSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
})).partial()

export type SoalABCOptionalDefaultsWithPartialRelations = z.infer<typeof SoalABCOptionalDefaultsSchema> & SoalABCPartialRelations

export const SoalABCOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SoalABCOptionalDefaultsWithPartialRelations> = SoalABCOptionalDefaultsSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export type SoalABCWithPartialRelations = z.infer<typeof SoalABCSchema> & SoalABCPartialRelations

export const SoalABCWithPartialRelationsSchema: z.ZodType<SoalABCWithPartialRelations> = SoalABCSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export default SoalABCSchema;
