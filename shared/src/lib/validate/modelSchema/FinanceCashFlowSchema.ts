import { z } from "zod";

/////////////////////////////////////////
// FINANCE CASH FLOW SCHEMA
/////////////////////////////////////////

export const FinanceCashFlowSchema = z.object({
	id: z.uuid(),
	type: z.string(),
	description: z.string(),
	amount: z.number().int(),
	date: z.date(),
})

export type FinanceCashFlow = z.infer<typeof FinanceCashFlowSchema>

/////////////////////////////////////////
// FINANCE CASH FLOW PARTIAL SCHEMA
/////////////////////////////////////////

export const FinanceCashFlowPartialSchema = FinanceCashFlowSchema.partial()

export type FinanceCashFlowPartial = z.infer<typeof FinanceCashFlowPartialSchema>

/////////////////////////////////////////
// FINANCE CASH FLOW OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FinanceCashFlowOptionalDefaultsSchema = FinanceCashFlowSchema.merge(z.object({
	id: z.uuid().optional(),
}))

export type FinanceCashFlowOptionalDefaults = z.infer<typeof FinanceCashFlowOptionalDefaultsSchema>

export default FinanceCashFlowSchema;
