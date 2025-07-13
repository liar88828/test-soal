import { z } from 'zod';
import { SoalWithRelationsSchema, SoalPartialWithRelationsSchema, SoalOptionalDefaultsWithRelationsSchema } from './SoalSchema'
import type { SoalWithRelations, SoalPartialWithRelations, SoalOptionalDefaultsWithRelations } from './SoalSchema'
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'

/////////////////////////////////////////
// SOAL ITEM SCHEMA
/////////////////////////////////////////

export const SoalItemSchema = z.object({
  id: z.number().int(),
  soalId: z.number().int(),
  question: z.string(),
  A: z.string(),
  B: z.string(),
  C: z.string(),
  D: z.string(),
  E: z.string(),
  answer: z.string(),
})

export type SoalItem = z.infer<typeof SoalItemSchema>

/////////////////////////////////////////
// SOAL ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const SoalItemPartialSchema = SoalItemSchema.partial()

export type SoalItemPartial = z.infer<typeof SoalItemPartialSchema>

/////////////////////////////////////////
// SOAL ITEM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SoalItemOptionalDefaultsSchema = SoalItemSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type SoalItemOptionalDefaults = z.infer<typeof SoalItemOptionalDefaultsSchema>

/////////////////////////////////////////
// SOAL ITEM RELATION SCHEMA
/////////////////////////////////////////

export type SoalItemRelations = {
  soal: SoalWithRelations;
  Answer: AnswerWithRelations[];
};

export type SoalItemWithRelations = z.infer<typeof SoalItemSchema> & SoalItemRelations

export const SoalItemWithRelationsSchema: z.ZodType<SoalItemWithRelations> = SoalItemSchema.merge(z.object({
  soal: z.lazy(() => SoalWithRelationsSchema),
  Answer: z.lazy(() => AnswerWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL ITEM OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SoalItemOptionalDefaultsRelations = {
  soal: SoalOptionalDefaultsWithRelations;
  Answer: AnswerOptionalDefaultsWithRelations[];
};

export type SoalItemOptionalDefaultsWithRelations = z.infer<typeof SoalItemOptionalDefaultsSchema> & SoalItemOptionalDefaultsRelations

export const SoalItemOptionalDefaultsWithRelationsSchema: z.ZodType<SoalItemOptionalDefaultsWithRelations> = SoalItemOptionalDefaultsSchema.merge(z.object({
  soal: z.lazy(() => SoalOptionalDefaultsWithRelationsSchema),
  Answer: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL ITEM PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalItemPartialRelations = {
  soal?: SoalPartialWithRelations;
  Answer?: AnswerPartialWithRelations[];
};

export type SoalItemPartialWithRelations = z.infer<typeof SoalItemPartialSchema> & SoalItemPartialRelations

export const SoalItemPartialWithRelationsSchema: z.ZodType<SoalItemPartialWithRelations> = SoalItemPartialSchema.merge(z.object({
  soal: z.lazy(() => SoalPartialWithRelationsSchema),
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
})).partial()

export type SoalItemOptionalDefaultsWithPartialRelations = z.infer<typeof SoalItemOptionalDefaultsSchema> & SoalItemPartialRelations

export const SoalItemOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SoalItemOptionalDefaultsWithPartialRelations> = SoalItemOptionalDefaultsSchema.merge(z.object({
  soal: z.lazy(() => SoalPartialWithRelationsSchema),
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export type SoalItemWithPartialRelations = z.infer<typeof SoalItemSchema> & SoalItemPartialRelations

export const SoalItemWithPartialRelationsSchema: z.ZodType<SoalItemWithPartialRelations> = SoalItemSchema.merge(z.object({
  soal: z.lazy(() => SoalPartialWithRelationsSchema),
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
}).partial())

export default SoalItemSchema;
