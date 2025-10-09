import { z } from "zod";
import { BillStatusSchema } from "../inputTypeSchemas/BillStatusSchema"

/////////////////////////////////////////
// FINANCE BILL STUDENT SCHEMA
/////////////////////////////////////////

export const FinanceBillStudentSchema = z.object({
	status: BillStatusSchema,
	id: z.uuid(),
	name: z.string(),
	kelas: z.string(),
	bulan: z.string(),
	nominal: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type FinanceBillStudent = z.infer<typeof FinanceBillStudentSchema>

/////////////////////////////////////////
// FINANCE BILL STUDENT PARTIAL SCHEMA
/////////////////////////////////////////

export const FinanceBillStudentPartialSchema = FinanceBillStudentSchema.partial()

export type FinanceBillStudentPartial = z.infer<typeof FinanceBillStudentPartialSchema>

/////////////////////////////////////////
// FINANCE BILL STUDENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FinanceBillStudentOptionalDefaultsSchema = FinanceBillStudentSchema.merge(z.object({
	status: BillStatusSchema.optional(),
	id: z.uuid().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
}))

export type FinanceBillStudentOptionalDefaults = z.infer<typeof FinanceBillStudentOptionalDefaultsSchema>

export default FinanceBillStudentSchema;
