import { z } from "zod";

/////////////////////////////////////////
// FINANCE ROOM SCHEMA
/////////////////////////////////////////

export const FinanceRoomSchema = z.object({
	id: z.uuid(),
	room: z.string(),
	cost: z.number().int(),
	note: z.string().nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type FinanceRoom = z.infer<typeof FinanceRoomSchema>

/////////////////////////////////////////
// FINANCE ROOM PARTIAL SCHEMA
/////////////////////////////////////////

export const FinanceRoomPartialSchema = FinanceRoomSchema.partial()

export type FinanceRoomPartial = z.infer<typeof FinanceRoomPartialSchema>

/////////////////////////////////////////
// FINANCE ROOM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FinanceRoomOptionalDefaultsSchema = FinanceRoomSchema.merge(z.object({
	id: z.uuid().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
}))

export type FinanceRoomOptionalDefaults = z.infer<typeof FinanceRoomOptionalDefaultsSchema>

export default FinanceRoomSchema;
