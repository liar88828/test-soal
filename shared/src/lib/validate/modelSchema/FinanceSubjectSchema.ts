import { z } from "zod";
import type { CostItemOptionalDefaultsWithRelations, CostItemPartialWithRelations, CostItemWithRelations } from "./CostItemSchema"
import { CostItemOptionalDefaultsWithRelationsSchema, CostItemPartialWithRelationsSchema, CostItemWithRelationsSchema } from "./CostItemSchema"

/////////////////////////////////////////
// FINANCE SUBJECT SCHEMA
/////////////////////////////////////////

export const FinanceSubjectSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	code: z.string(),
	category: z.string(),
	cost: z.number().int(),
	description: z.string().nullish(),
	semester: z.number().int(),
	isActive: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type FinanceSubject = z.infer<typeof FinanceSubjectSchema>

/////////////////////////////////////////
// FINANCE SUBJECT PARTIAL SCHEMA
/////////////////////////////////////////

export const FinanceSubjectPartialSchema = FinanceSubjectSchema.partial()

export type FinanceSubjectPartial = z.infer<typeof FinanceSubjectPartialSchema>

/////////////////////////////////////////
// FINANCE SUBJECT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FinanceSubjectOptionalDefaultsSchema = FinanceSubjectSchema.merge(z.object({
	id: z.uuid().optional(),
	isActive: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
}))

export type FinanceSubjectOptionalDefaults = z.infer<typeof FinanceSubjectOptionalDefaultsSchema>

/////////////////////////////////////////
// FINANCE SUBJECT RELATION SCHEMA
/////////////////////////////////////////

export type FinanceSubjectRelations = {
	costList: CostItemWithRelations[];
};

export type FinanceSubjectWithRelations = z.infer<typeof FinanceSubjectSchema> & FinanceSubjectRelations

export const FinanceSubjectWithRelationsSchema: z.ZodType<FinanceSubjectWithRelations> = FinanceSubjectSchema.merge(z.object({
	costList: z.lazy(() => CostItemWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// FINANCE SUBJECT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type FinanceSubjectOptionalDefaultsRelations = {
	costList: CostItemOptionalDefaultsWithRelations[];
};

export type FinanceSubjectOptionalDefaultsWithRelations = z.infer<typeof FinanceSubjectOptionalDefaultsSchema> & FinanceSubjectOptionalDefaultsRelations

export const FinanceSubjectOptionalDefaultsWithRelationsSchema: z.ZodType<FinanceSubjectOptionalDefaultsWithRelations> = FinanceSubjectOptionalDefaultsSchema.merge(z.object({
	costList: z.lazy(() => CostItemOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// FINANCE SUBJECT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type FinanceSubjectPartialRelations = {
	costList?: CostItemPartialWithRelations[];
};

export type FinanceSubjectPartialWithRelations = z.infer<typeof FinanceSubjectPartialSchema> & FinanceSubjectPartialRelations

export const FinanceSubjectPartialWithRelationsSchema: z.ZodType<FinanceSubjectPartialWithRelations> = FinanceSubjectPartialSchema.merge(z.object({
	costList: z.lazy(() => CostItemPartialWithRelationsSchema).array(),
})).partial()

export type FinanceSubjectOptionalDefaultsWithPartialRelations = z.infer<typeof FinanceSubjectOptionalDefaultsSchema> & FinanceSubjectPartialRelations

export const FinanceSubjectOptionalDefaultsWithPartialRelationsSchema: z.ZodType<FinanceSubjectOptionalDefaultsWithPartialRelations> = FinanceSubjectOptionalDefaultsSchema.merge(z.object({
	costList: z.lazy(() => CostItemPartialWithRelationsSchema).array(),
}).partial())

export type FinanceSubjectWithPartialRelations = z.infer<typeof FinanceSubjectSchema> & FinanceSubjectPartialRelations

export const FinanceSubjectWithPartialRelationsSchema: z.ZodType<FinanceSubjectWithPartialRelations> = FinanceSubjectSchema.merge(z.object({
	costList: z.lazy(() => CostItemPartialWithRelationsSchema).array(),
}).partial())

export default FinanceSubjectSchema;
