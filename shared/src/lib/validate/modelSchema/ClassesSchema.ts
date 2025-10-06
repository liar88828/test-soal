import { z } from 'zod';
import { TeacherWithRelationsSchema, TeacherPartialWithRelationsSchema, TeacherOptionalDefaultsWithRelationsSchema } from './TeacherSchema'
import type { TeacherWithRelations, TeacherPartialWithRelations, TeacherOptionalDefaultsWithRelations } from './TeacherSchema'
import { GradeWithRelationsSchema, GradePartialWithRelationsSchema, GradeOptionalDefaultsWithRelationsSchema } from './GradeSchema'
import type { GradeWithRelations, GradePartialWithRelations, GradeOptionalDefaultsWithRelations } from './GradeSchema'
import { StudentWithRelationsSchema, StudentPartialWithRelationsSchema, StudentOptionalDefaultsWithRelationsSchema } from './StudentSchema'
import type { StudentWithRelations, StudentPartialWithRelations, StudentOptionalDefaultsWithRelations } from './StudentSchema'

/////////////////////////////////////////
// CLASSES SCHEMA
/////////////////////////////////////////

export const ClassesSchema = z.object({
  id: z.uuid(),
  section: z.string(),
  room: z.string(),
  idTeacher: z.string(),
  nameTeacher: z.string(),
  idGrade: z.string(),
})

export type Classes = z.infer<typeof ClassesSchema>

/////////////////////////////////////////
// CLASSES PARTIAL SCHEMA
/////////////////////////////////////////

export const ClassesPartialSchema = ClassesSchema.partial()

export type ClassesPartial = z.infer<typeof ClassesPartialSchema>

/////////////////////////////////////////
// CLASSES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ClassesOptionalDefaultsSchema = ClassesSchema.merge(z.object({
  id: z.uuid().optional(),
}))

export type ClassesOptionalDefaults = z.infer<typeof ClassesOptionalDefaultsSchema>

/////////////////////////////////////////
// CLASSES RELATION SCHEMA
/////////////////////////////////////////

export type ClassesRelations = {
  Teacher: TeacherWithRelations;
  Grade: GradeWithRelations;
  Student: StudentWithRelations[];
};

export type ClassesWithRelations = z.infer<typeof ClassesSchema> & ClassesRelations

export const ClassesWithRelationsSchema: z.ZodType<ClassesWithRelations> = ClassesSchema.merge(z.object({
  Teacher: z.lazy(() => TeacherWithRelationsSchema),
  Grade: z.lazy(() => GradeWithRelationsSchema),
  Student: z.lazy(() => StudentWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// CLASSES OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ClassesOptionalDefaultsRelations = {
  Teacher: TeacherOptionalDefaultsWithRelations;
  Grade: GradeOptionalDefaultsWithRelations;
  Student: StudentOptionalDefaultsWithRelations[];
};

export type ClassesOptionalDefaultsWithRelations = z.infer<typeof ClassesOptionalDefaultsSchema> & ClassesOptionalDefaultsRelations

export const ClassesOptionalDefaultsWithRelationsSchema: z.ZodType<ClassesOptionalDefaultsWithRelations> = ClassesOptionalDefaultsSchema.merge(z.object({
  Teacher: z.lazy(() => TeacherOptionalDefaultsWithRelationsSchema),
  Grade: z.lazy(() => GradeOptionalDefaultsWithRelationsSchema),
  Student: z.lazy(() => StudentOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// CLASSES PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ClassesPartialRelations = {
  Teacher?: TeacherPartialWithRelations;
  Grade?: GradePartialWithRelations;
  Student?: StudentPartialWithRelations[];
};

export type ClassesPartialWithRelations = z.infer<typeof ClassesPartialSchema> & ClassesPartialRelations

export const ClassesPartialWithRelationsSchema: z.ZodType<ClassesPartialWithRelations> = ClassesPartialSchema.merge(z.object({
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Student: z.lazy(() => StudentPartialWithRelationsSchema).array(),
})).partial()

export type ClassesOptionalDefaultsWithPartialRelations = z.infer<typeof ClassesOptionalDefaultsSchema> & ClassesPartialRelations

export const ClassesOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ClassesOptionalDefaultsWithPartialRelations> = ClassesOptionalDefaultsSchema.merge(z.object({
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Student: z.lazy(() => StudentPartialWithRelationsSchema).array(),
}).partial())

export type ClassesWithPartialRelations = z.infer<typeof ClassesSchema> & ClassesPartialRelations

export const ClassesWithPartialRelationsSchema: z.ZodType<ClassesWithPartialRelations> = ClassesSchema.merge(z.object({
  Teacher: z.lazy(() => TeacherPartialWithRelationsSchema),
  Grade: z.lazy(() => GradePartialWithRelationsSchema),
  Student: z.lazy(() => StudentPartialWithRelationsSchema).array(),
}).partial())

export default ClassesSchema;
