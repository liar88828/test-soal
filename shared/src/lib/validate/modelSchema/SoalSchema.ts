import { z } from "zod";
import type { SoalABCOptionalDefaultsWithRelations, SoalABCPartialWithRelations, SoalABCWithRelations } from "./SoalABCSchema"
import { SoalABCOptionalDefaultsWithRelationsSchema, SoalABCPartialWithRelationsSchema, SoalABCWithRelationsSchema } from "./SoalABCSchema"
import type { SoalTextOptionalDefaultsWithRelations, SoalTextPartialWithRelations, SoalTextWithRelations } from "./SoalTextSchema"
import { SoalTextOptionalDefaultsWithRelationsSchema, SoalTextPartialWithRelationsSchema, SoalTextWithRelationsSchema } from "./SoalTextSchema"

/////////////////////////////////////////
// SOAL SCHEMA
/////////////////////////////////////////

export const SoalSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  author: z.string(),
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
  SoalABC: SoalABCWithRelations[];
  SoalText: SoalTextWithRelations[];
};

export type SoalWithRelations = z.infer<typeof SoalSchema> & SoalRelations

export const SoalWithRelationsSchema: z.ZodType<SoalWithRelations> = SoalSchema.merge(z.object({
  SoalABC: z.lazy(() => SoalABCWithRelationsSchema).array(),
  SoalText: z.lazy(() => SoalTextWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SoalOptionalDefaultsRelations = {
  SoalABC: SoalABCOptionalDefaultsWithRelations[];
  SoalText: SoalTextOptionalDefaultsWithRelations[];
};

export type SoalOptionalDefaultsWithRelations = z.infer<typeof SoalOptionalDefaultsSchema> & SoalOptionalDefaultsRelations

export const SoalOptionalDefaultsWithRelationsSchema: z.ZodType<SoalOptionalDefaultsWithRelations> = SoalOptionalDefaultsSchema.merge(z.object({
  SoalABC: z.lazy(() => SoalABCOptionalDefaultsWithRelationsSchema).array(),
  SoalText: z.lazy(() => SoalTextOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SOAL PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SoalPartialRelations = {
  SoalABC?: SoalABCPartialWithRelations[];
  SoalText?: SoalTextPartialWithRelations[];
};

export type SoalPartialWithRelations = z.infer<typeof SoalPartialSchema> & SoalPartialRelations

export const SoalPartialWithRelationsSchema: z.ZodType<SoalPartialWithRelations> = SoalPartialSchema.merge(z.object({
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).array(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).array(),
})).partial()

export type SoalOptionalDefaultsWithPartialRelations = z.infer<typeof SoalOptionalDefaultsSchema> & SoalPartialRelations

export const SoalOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SoalOptionalDefaultsWithPartialRelations> = SoalOptionalDefaultsSchema.merge(z.object({
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).array(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).array(),
}).partial())

export type SoalWithPartialRelations = z.infer<typeof SoalSchema> & SoalPartialRelations

export const SoalWithPartialRelationsSchema: z.ZodType<SoalWithPartialRelations> = SoalSchema.merge(z.object({
  SoalABC: z.lazy(() => SoalABCPartialWithRelationsSchema).array(),
  SoalText: z.lazy(() => SoalTextPartialWithRelationsSchema).array(),
}).partial())

export default SoalSchema;
