import { z } from 'zod';
import { AnswerWithRelationsSchema, AnswerPartialWithRelationsSchema, AnswerOptionalDefaultsWithRelationsSchema } from './AnswerSchema'
import type { AnswerWithRelations, AnswerPartialWithRelations, AnswerOptionalDefaultsWithRelations } from './AnswerSchema'
import { SoalWithRelationsSchema, SoalPartialWithRelationsSchema, SoalOptionalDefaultsWithRelationsSchema } from './SoalSchema'
import type { SoalWithRelations, SoalPartialWithRelations, SoalOptionalDefaultsWithRelations } from './SoalSchema'

/////////////////////////////////////////
// SOAL TEXT SCHEMA
/////////////////////////////////////////

export const SoalTextSchema = z.object({
  id: z.number().int(),
  question: z.string(),
  text: z.string(),
  answer: z.string(),
  soalId: z.number().int(),
})

export type SoalText = z.infer<typeof SoalTextSchema>

/////////////////////////////////////////
// SOAL TEXT PARTIAL SCHEMA
/////////////////////////////////////////

export const SoalTextPartialSchema = SoalTextSchema.partial()

export type SoalTextPartial = z.infer<typeof SoalTextPartialSchema>

/////////////////////////////////////////
// SOAL TEXT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SoalTextOptionalDefaultsSchema = SoalTextSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type SoalTextOptionalDefaults = z.infer<typeof SoalTextOptionalDefaultsSchema>

/////////////////////////////////////////
// SOAL TEXT RELATION SCHEMA
/////////////////////////////////////////

export type SoalTextRelations = {
  Answer: AnswerWithRelations[];
  Soal: SoalWithRelations;
};

export type SoalTextWithRelations = z.infer<typeof SoalTextSchema> & SoalTextRelations

export const SoalTextWithRelationsSchema: z.ZodType<SoalTextWithRelations> = SoalTextSchema.merge(z.object({
  Answer: z.lazy(() => AnswerWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalWithRelationsSchema),
}))

/////////////////////////////////////////
// SOAL TEXT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SoalTextOptionalDefaultsRelations = {
  Answer: AnswerOptionalDefaultsWithRelations[];
  Soal: SoalOptionalDefaultsWithRelations;
};

export type SoalTextOptionalDefaultsWithRelations = z.infer<typeof SoalTextOptionalDefaultsSchema> & SoalTextOptionalDefaultsRelations

export const SoalTextOptionalDefaultsWithRelationsSchema: z.ZodType<SoalTextOptionalDefaultsWithRelations> = SoalTextOptionalDefaultsSchema.merge(z.object({
  Answer: z.lazy(() => AnswerOptionalDefaultsWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// SOAL TEXT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalTextPartialRelations = {
  Answer?: AnswerPartialWithRelations[];
  Soal?: SoalPartialWithRelations;
};

export type SoalTextPartialWithRelations = z.infer<typeof SoalTextPartialSchema> & SoalTextPartialRelations

export const SoalTextPartialWithRelationsSchema: z.ZodType<SoalTextPartialWithRelations> = SoalTextPartialSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
})).partial()

export type SoalTextOptionalDefaultsWithPartialRelations = z.infer<typeof SoalTextOptionalDefaultsSchema> & SoalTextPartialRelations

export const SoalTextOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SoalTextOptionalDefaultsWithPartialRelations> = SoalTextOptionalDefaultsSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export type SoalTextWithPartialRelations = z.infer<typeof SoalTextSchema> & SoalTextPartialRelations

export const SoalTextWithPartialRelationsSchema: z.ZodType<SoalTextWithPartialRelations> = SoalTextSchema.merge(z.object({
  Answer: z.lazy(() => AnswerPartialWithRelationsSchema).array(),
  Soal: z.lazy(() => SoalPartialWithRelationsSchema),
}).partial())

export default SoalTextSchema;
