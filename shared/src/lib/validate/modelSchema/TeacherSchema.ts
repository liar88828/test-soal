import { z } from "zod";
import { TeacherGenderSchema } from "../inputTypeSchemas/TeacherGenderSchema"

/////////////////////////////////////////
// TEACHER SCHEMA
/////////////////////////////////////////

export const TeacherSchema = z.object({
	gender: TeacherGenderSchema,
	id: z.uuid(),
	name: z.string(),
	subject: z.string(),
	phone: z.string(),
	email: z.string(),
	address: z.string(),
	photo: z.string(),
	birthDate: z.date(),
	createdAt: z.date(),
})

export type Teacher = z.infer<typeof TeacherSchema>

/////////////////////////////////////////
// TEACHER PARTIAL SCHEMA
/////////////////////////////////////////

export const TeacherPartialSchema = TeacherSchema.partial()

export type TeacherPartial = z.infer<typeof TeacherPartialSchema>

/////////////////////////////////////////
// TEACHER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TeacherOptionalDefaultsSchema = TeacherSchema.merge(z.object({
	id: z.uuid().optional(),
	createdAt: z.date().optional(),
}))

export type TeacherOptionalDefaults = z.infer<typeof TeacherOptionalDefaultsSchema>

export default TeacherSchema;
