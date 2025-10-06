import { z } from "zod";
import type { GradeOptionalDefaultsWithRelations, GradePartialWithRelations, GradeWithRelations } from "./GradeSchema"
import { GradeOptionalDefaultsWithRelationsSchema, GradePartialWithRelationsSchema, GradeWithRelationsSchema } from "./GradeSchema"
import type { TeacherOptionalDefaultsWithRelations, TeacherPartialWithRelations, TeacherWithRelations } from "./TeacherSchema"
import { TeacherOptionalDefaultsWithRelationsSchema, TeacherPartialWithRelationsSchema, TeacherWithRelationsSchema } from "./TeacherSchema"

/////////////////////////////////////////
// MAPEL SCHEMA
/////////////////////////////////////////

export const MapelSchema = z.object({
  id: z.uuid(),
	name: z.string(),
	jp: z.number().int(),
  idGrade: z.string(),
  idTeacher: z.string(),
  nameTeacher: z.string(),
})

export type Mapel = z.infer<typeof MapelSchema>

/////////////////////////////////////////
// MAPEL PARTIAL SCHEMA
/////////////////////////////////////////

export const MapelPartialSchema = MapelSchema.partial()

export type MapelPartial = z.infer<typeof MapelPartialSchema>

/////////////////////////////////////////
// MAPEL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const MapelOptionalDefaultsSchema = MapelSchema.merge(z.object({
  id: z.uuid().optional(),
}))

export type MapelOptionalDefaults = z.infer<typeof MapelOptionalDefaultsSchema>

/////////////////////////////////////////
// MAPEL RELATION SCHEMA
/////////////////////////////////////////

export type MapelRelations = {
  Grade: GradeWithRelations;
  Teacher: TeacherWithRelations;
};

export type MapelWithRelations = z.infer<typeof MapelSchema> & MapelRelations

export const MapelWithRelationsSchema: z.ZodType<MapelWithRelations> = MapelSchema.merge(z.object({
  Grade: z.lazy(() => GradeWithRelationsSchema),
  Teacher: z.lazy(() => TeacherWithRelationsSchema),
}))

/////////////////////////////////////////
// MAPEL OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type MapelOptionalDefaultsRelations = {
  Grade: GradeOptionalDefaultsWithRelations;
  Teacher: TeacherOptionalDefaultsWithRelations;
};

export type MapelOptionalDefaultsWithRelations = z.infer<typeof MapelOptionalDefaultsSchema> & MapelOptionalDefaultsRelations

export const MapelOptionalDefaultsWithRelationsSchema: z.ZodType<MapelOptionalDefaultsWithRelations> = MapelOptionalDefaultsSchema.merge(z.object({
  Grade: z.lazy(() => GradeOptionalDefaultsWithRelationsSchema),
  Teacher: z.lazy(() => TeacherOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// MAPEL PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type MapelPartialRelations = {
  Grade?: GradePartialWithRelations;
  Teacher?: TeacherPartialWithRelations;
};

export type MapelPartialWithRelations = z.infer<typeof MapelPartialSchema> & MapelPartialRelations

export const MapelPartialWithRelationsSchema: z.ZodType<MapelPartialWithRelations> = MapelPartialSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
})).partial()

export type MapelOptionalDefaultsWithPartialRelations = z.infer<typeof MapelOptionalDefaultsSchema> & MapelPartialRelations

export const MapelOptionalDefaultsWithPartialRelationsSchema: z.ZodType<MapelOptionalDefaultsWithPartialRelations> = MapelOptionalDefaultsSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
}).partial())

export type MapelWithPartialRelations = z.infer<typeof MapelSchema> & MapelPartialRelations

export const MapelWithPartialRelationsSchema: z.ZodType<MapelWithPartialRelations> = MapelSchema.merge(z.object({
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
}).partial())

export default MapelSchema;
