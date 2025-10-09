import { z } from "zod";
import type { FinanceSubjectOptionalDefaultsWithRelations, FinanceSubjectPartialWithRelations, FinanceSubjectWithRelations } from "./FinanceSubjectSchema"
import { FinanceSubjectOptionalDefaultsWithRelationsSchema, FinanceSubjectPartialWithRelationsSchema, FinanceSubjectWithRelationsSchema } from "./FinanceSubjectSchema"

/////////////////////////////////////////
// COST ITEM SCHEMA
/////////////////////////////////////////

export const CostItemSchema = z.object({
	id: z.uuid(),
	subjectId: z.string(),
	name: z.string(),
	amount: z.number().int(),
	description: z.string().nullish(),
	createdAt: z.date(),
})

export type CostItem = z.infer<typeof CostItemSchema>

/////////////////////////////////////////
// COST ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const CostItemPartialSchema = CostItemSchema.partial()

export type CostItemPartial = z.infer<typeof CostItemPartialSchema>

/////////////////////////////////////////
// COST ITEM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CostItemOptionalDefaultsSchema = CostItemSchema.merge(z.object({
	id: z.uuid().optional(),
	createdAt: z.date().optional(),
}))

export type CostItemOptionalDefaults = z.infer<typeof CostItemOptionalDefaultsSchema>

/////////////////////////////////////////
// COST ITEM RELATION SCHEMA
/////////////////////////////////////////

export type CostItemRelations = {
	subject: FinanceSubjectWithRelations;
};

export type CostItemWithRelations = z.infer<typeof CostItemSchema> & CostItemRelations

export const CostItemWithRelationsSchema: z.ZodType<CostItemWithRelations> = CostItemSchema.merge(z.object({
	subject: z.lazy(() => FinanceSubjectWithRelationsSchema),
}))

/////////////////////////////////////////
// COST ITEM OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type CostItemOptionalDefaultsRelations = {
	subject: FinanceSubjectOptionalDefaultsWithRelations;
};

export type CostItemOptionalDefaultsWithRelations = z.infer<typeof CostItemOptionalDefaultsSchema> & CostItemOptionalDefaultsRelations

export const CostItemOptionalDefaultsWithRelationsSchema: z.ZodType<CostItemOptionalDefaultsWithRelations> = CostItemOptionalDefaultsSchema.merge(z.object({
	subject: z.lazy(() => FinanceSubjectOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// COST ITEM PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type CostItemPartialRelations = {
	subject?: FinanceSubjectPartialWithRelations;
};

export type CostItemPartialWithRelations = z.infer<typeof CostItemPartialSchema> & CostItemPartialRelations

export const CostItemPartialWithRelationsSchema: z.ZodType<CostItemPartialWithRelations> = CostItemPartialSchema.merge(z.object({
	subject: z.lazy(() => FinanceSubjectPartialWithRelationsSchema),
})).partial()

export type CostItemOptionalDefaultsWithPartialRelations = z.infer<typeof CostItemOptionalDefaultsSchema> & CostItemPartialRelations

export const CostItemOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CostItemOptionalDefaultsWithPartialRelations> = CostItemOptionalDefaultsSchema.merge(z.object({
	subject: z.lazy(() => FinanceSubjectPartialWithRelationsSchema),
}).partial())

export type CostItemWithPartialRelations = z.infer<typeof CostItemSchema> & CostItemPartialRelations

export const CostItemWithPartialRelationsSchema: z.ZodType<CostItemWithPartialRelations> = CostItemSchema.merge(z.object({
	subject: z.lazy(() => FinanceSubjectPartialWithRelationsSchema),
}).partial())

export default CostItemSchema;
