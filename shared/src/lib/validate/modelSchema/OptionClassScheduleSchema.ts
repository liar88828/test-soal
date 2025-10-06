import { z } from 'zod';
import { GradeWithRelationsSchema, GradePartialWithRelationsSchema, GradeOptionalDefaultsWithRelationsSchema } from './GradeSchema'
import type { GradeWithRelations, GradePartialWithRelations, GradeOptionalDefaultsWithRelations } from './GradeSchema'

/////////////////////////////////////////
// OPTION CLASS SCHEDULE SCHEMA
/////////////////////////////////////////

export const OptionClassScheduleSchema = z.object({
  id: z.uuid(),
  idGrade: z.string(),
  nameSubject: z.string(),
  jp: z.number().int(),
})

export type OptionClassSchedule = z.infer<typeof OptionClassScheduleSchema>

/////////////////////////////////////////
// OPTION CLASS SCHEDULE PARTIAL SCHEMA
/////////////////////////////////////////

export const OptionClassSchedulePartialSchema = OptionClassScheduleSchema.partial()

export type OptionClassSchedulePartial = z.infer<typeof OptionClassSchedulePartialSchema>

/////////////////////////////////////////
// OPTION CLASS SCHEDULE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OptionClassScheduleOptionalDefaultsSchema = OptionClassScheduleSchema.merge(z.object({
  id: z.uuid().optional(),
}))

export type OptionClassScheduleOptionalDefaults = z.infer<typeof OptionClassScheduleOptionalDefaultsSchema>

/////////////////////////////////////////
// OPTION CLASS SCHEDULE RELATION SCHEMA
/////////////////////////////////////////

export type OptionClassScheduleRelations = {
  Grade: GradeWithRelations;
};

export type OptionClassScheduleWithRelations = z.infer<typeof OptionClassScheduleSchema> & OptionClassScheduleRelations

export const OptionClassScheduleWithRelationsSchema: z.ZodType<OptionClassScheduleWithRelations> = OptionClassScheduleSchema.merge(z.object({
  Grade: z.lazy(() => GradeWithRelationsSchema),
}))

/////////////////////////////////////////
// OPTION CLASS SCHEDULE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OptionClassScheduleOptionalDefaultsRelations = {
  Grade: GradeOptionalDefaultsWithRelations;
};

export type OptionClassScheduleOptionalDefaultsWithRelations = z.infer<typeof OptionClassScheduleOptionalDefaultsSchema> & OptionClassScheduleOptionalDefaultsRelations

export const OptionClassScheduleOptionalDefaultsWithRelationsSchema: z.ZodType<OptionClassScheduleOptionalDefaultsWithRelations> = OptionClassScheduleOptionalDefaultsSchema.merge(z.object({
  Grade: z.lazy(() => GradeOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// OPTION CLASS SCHEDULE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type OptionClassSchedulePartialRelations = {
  Grade?: GradePartialWithRelations;
};

export type OptionClassSchedulePartialWithRelations = z.infer<typeof OptionClassSchedulePartialSchema> & OptionClassSchedulePartialRelations

export const OptionClassSchedulePartialWithRelationsSchema: z.ZodType<OptionClassSchedulePartialWithRelations> = OptionClassSchedulePartialSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
})).partial()

export type OptionClassScheduleOptionalDefaultsWithPartialRelations = z.infer<typeof OptionClassScheduleOptionalDefaultsSchema> & OptionClassSchedulePartialRelations

export const OptionClassScheduleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<OptionClassScheduleOptionalDefaultsWithPartialRelations> = OptionClassScheduleOptionalDefaultsSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
}).partial())

export type OptionClassScheduleWithPartialRelations = z.infer<typeof OptionClassScheduleSchema> & OptionClassSchedulePartialRelations

export const OptionClassScheduleWithPartialRelationsSchema: z.ZodType<OptionClassScheduleWithPartialRelations> = OptionClassScheduleSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
}).partial())

export default OptionClassScheduleSchema;
