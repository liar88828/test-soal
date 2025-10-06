import { z } from 'zod';
import { LevelSchema } from '../inputTypeSchemas/LevelSchema'
import { ClassesWithRelationsSchema, ClassesPartialWithRelationsSchema, ClassesOptionalDefaultsWithRelationsSchema } from './ClassesSchema'
import type { ClassesWithRelations, ClassesPartialWithRelations, ClassesOptionalDefaultsWithRelations } from './ClassesSchema'
import { MapelWithRelationsSchema, MapelPartialWithRelationsSchema, MapelOptionalDefaultsWithRelationsSchema } from './MapelSchema'
import type { MapelWithRelations, MapelPartialWithRelations, MapelOptionalDefaultsWithRelations } from './MapelSchema'
import { OptionClassScheduleWithRelationsSchema, OptionClassSchedulePartialWithRelationsSchema, OptionClassScheduleOptionalDefaultsWithRelationsSchema } from './OptionClassScheduleSchema'
import type { OptionClassScheduleWithRelations, OptionClassSchedulePartialWithRelations, OptionClassScheduleOptionalDefaultsWithRelations } from './OptionClassScheduleSchema'

/////////////////////////////////////////
// GRADE SCHEMA
/////////////////////////////////////////

export const GradeSchema = z.object({
  level: LevelSchema,
  id: z.uuid(),
  name: z.string(),
  grade: z.number().int().nullish(),
})

export type Grade = z.infer<typeof GradeSchema>

/////////////////////////////////////////
// GRADE PARTIAL SCHEMA
/////////////////////////////////////////

export const GradePartialSchema = GradeSchema.partial()

export type GradePartial = z.infer<typeof GradePartialSchema>

/////////////////////////////////////////
// GRADE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GradeOptionalDefaultsSchema = GradeSchema.merge(z.object({
  id: z.uuid().optional(),
}))

export type GradeOptionalDefaults = z.infer<typeof GradeOptionalDefaultsSchema>

/////////////////////////////////////////
// GRADE RELATION SCHEMA
/////////////////////////////////////////

export type GradeRelations = {
  Classes: ClassesWithRelations[];
  Mapel: MapelWithRelations[];
  OptionClassSchedule: OptionClassScheduleWithRelations[];
};

export type GradeWithRelations = z.infer<typeof GradeSchema> & GradeRelations

export const GradeWithRelationsSchema: z.ZodType<GradeWithRelations> = GradeSchema.merge(z.object({
  Classes: z.lazy(() => ClassesWithRelationsSchema).array(),
  Mapel: z.lazy(() => MapelWithRelationsSchema).array(),
  OptionClassSchedule: z.lazy(() => OptionClassScheduleWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// GRADE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type GradeOptionalDefaultsRelations = {
  Classes: ClassesOptionalDefaultsWithRelations[];
  Mapel: MapelOptionalDefaultsWithRelations[];
  OptionClassSchedule: OptionClassScheduleOptionalDefaultsWithRelations[];
};

export type GradeOptionalDefaultsWithRelations = z.infer<typeof GradeOptionalDefaultsSchema> & GradeOptionalDefaultsRelations

export const GradeOptionalDefaultsWithRelationsSchema: z.ZodType<GradeOptionalDefaultsWithRelations> = GradeOptionalDefaultsSchema.merge(z.object({
  Classes: z.lazy(() => ClassesOptionalDefaultsWithRelationsSchema).array(),
  Mapel: z.lazy(() => MapelOptionalDefaultsWithRelationsSchema).array(),
  OptionClassSchedule: z.lazy(() => OptionClassScheduleOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// GRADE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type GradePartialRelations = {
  Classes?: ClassesPartialWithRelations[];
  Mapel?: MapelPartialWithRelations[];
  OptionClassSchedule?: OptionClassSchedulePartialWithRelations[];
};

export type GradePartialWithRelations = z.infer<typeof GradePartialSchema> & GradePartialRelations

export const GradePartialWithRelationsSchema: z.ZodType<GradePartialWithRelations> = GradePartialSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  OptionClassSchedule: z.lazy(() => OptionClassSchedulePartialWithRelationsSchema).array(),
})).partial()

export type GradeOptionalDefaultsWithPartialRelations = z.infer<typeof GradeOptionalDefaultsSchema> & GradePartialRelations

export const GradeOptionalDefaultsWithPartialRelationsSchema: z.ZodType<GradeOptionalDefaultsWithPartialRelations> = GradeOptionalDefaultsSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  OptionClassSchedule: z.lazy(() => OptionClassSchedulePartialWithRelationsSchema).array(),
}).partial())

export type GradeWithPartialRelations = z.infer<typeof GradeSchema> & GradePartialRelations

export const GradeWithPartialRelationsSchema: z.ZodType<GradeWithPartialRelations> = GradeSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).array(),
  Mapel: z.lazy(() => MapelPartialWithRelationsSchema).array(),
  OptionClassSchedule: z.lazy(() => OptionClassSchedulePartialWithRelationsSchema).array(),
}).partial())

export default GradeSchema;
