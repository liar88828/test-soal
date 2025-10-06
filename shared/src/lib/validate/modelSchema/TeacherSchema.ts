import { z } from 'zod';
import { GenderSchema } from '../inputTypeSchemas/GenderSchema'
import { MapelWithRelationsSchema, MapelPartialWithRelationsSchema, MapelOptionalDefaultsWithRelationsSchema } from './MapelSchema'
import type { MapelWithRelations, MapelPartialWithRelations, MapelOptionalDefaultsWithRelations } from './MapelSchema'
import { ClassesWithRelationsSchema, ClassesPartialWithRelationsSchema, ClassesOptionalDefaultsWithRelationsSchema } from './ClassesSchema'
import type { ClassesWithRelations, ClassesPartialWithRelations, ClassesOptionalDefaultsWithRelations } from './ClassesSchema'

/////////////////////////////////////////
// TEACHER SCHEMA
/////////////////////////////////////////

export const TeacherSchema = z.object({
  gender: GenderSchema,
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

/////////////////////////////////////////
// TEACHER RELATION SCHEMA
/////////////////////////////////////////

export type TeacherRelations = {
  Mapel: MapelWithRelations[];
  Classes: ClassesWithRelations[];
};

export type TeacherWithRelations = z.infer<typeof TeacherSchema> & TeacherRelations

export const TeacherWithRelationsSchema: z.ZodType<TeacherWithRelations> = TeacherSchema.merge(z.object({
  Mapel: z.lazy(() => MapelWithRelationsSchema).array(),
  Classes: z.lazy(() => ClassesWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TEACHER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TeacherOptionalDefaultsRelations = {
  Mapel: MapelOptionalDefaultsWithRelations[];
  Classes: ClassesOptionalDefaultsWithRelations[];
};

export type TeacherOptionalDefaultsWithRelations = z.infer<typeof TeacherOptionalDefaultsSchema> & TeacherOptionalDefaultsRelations

export const TeacherOptionalDefaultsWithRelationsSchema: z.ZodType<TeacherOptionalDefaultsWithRelations> = TeacherOptionalDefaultsSchema.merge(z.object({
  Mapel: z.lazy(() => MapelOptionalDefaultsWithRelationsSchema).array(),
  Classes: z.lazy(() => ClassesOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TEACHER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type TeacherPartialRelations = {
  Mapel?: MapelPartialWithRelations[];
  Classes?: ClassesPartialWithRelations[];
};

export type TeacherPartialWithRelations = z.infer<typeof TeacherPartialSchema> & TeacherPartialRelations

export const TeacherPartialWithRelationsSchema: z.ZodType<TeacherPartialWithRelations> = TeacherPartialSchema.merge(z.object({
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
})).partial()

export type TeacherOptionalDefaultsWithPartialRelations = z.infer<typeof TeacherOptionalDefaultsSchema> & TeacherPartialRelations

export const TeacherOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TeacherOptionalDefaultsWithPartialRelations> = TeacherOptionalDefaultsSchema.merge(z.object({
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
}).partial())

export type TeacherWithPartialRelations = z.infer<typeof TeacherSchema> & TeacherPartialRelations

export const TeacherWithPartialRelationsSchema: z.ZodType<TeacherWithPartialRelations> = TeacherSchema.merge(z.object({
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
}).partial())

export default TeacherSchema;
