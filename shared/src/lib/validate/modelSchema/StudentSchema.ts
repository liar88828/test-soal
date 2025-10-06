import { z } from 'zod';
import { GenderSchema } from '../inputTypeSchemas/GenderSchema'
import { StatusSiswaSchema } from '../inputTypeSchemas/StatusSiswaSchema'
import { ClassesWithRelationsSchema, ClassesPartialWithRelationsSchema, ClassesOptionalDefaultsWithRelationsSchema } from './ClassesSchema'
import type { ClassesWithRelations, ClassesPartialWithRelations, ClassesOptionalDefaultsWithRelations } from './ClassesSchema'

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  jenisKelamin: GenderSchema,
  status: StatusSiswaSchema,
  id: z.uuid(),
  nis: z.string(),
  namaLengkap: z.string(),
  tanggalLahir: z.date(),
  tempatLahir: z.string(),
  kelas: z.string(),
  jurusan: z.string(),
  tahunMasuk: z.number().int(),
  tahunKeluar: z.number().int().nullish(),
  alamat: z.string(),
  noHp: z.string().nullish(),
  email: z.string().nullish(),
  namaAyah: z.string().nullish(),
  pekerjaanAyah: z.string().nullish(),
  namaIbu: z.string().nullish(),
  pekerjaanIbu: z.string().nullish(),
  namaWali: z.string().nullish(),
  pekerjaanWali: z.string().nullish(),
  noHpWali: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  idClass: z.string().nullish(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// STUDENT PARTIAL SCHEMA
/////////////////////////////////////////

export const StudentPartialSchema = StudentSchema.partial()

export type StudentPartial = z.infer<typeof StudentPartialSchema>

/////////////////////////////////////////
// STUDENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const StudentOptionalDefaultsSchema = StudentSchema.merge(z.object({
  id: z.uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type StudentOptionalDefaults = z.infer<typeof StudentOptionalDefaultsSchema>

/////////////////////////////////////////
// STUDENT RELATION SCHEMA
/////////////////////////////////////////

export type StudentRelations = {
  Classes?: ClassesWithRelations | null;
};

export type StudentWithRelations = z.infer<typeof StudentSchema> & StudentRelations

export const StudentWithRelationsSchema: z.ZodType<StudentWithRelations> = StudentSchema.merge(z.object({
  Classes: z.lazy(() => ClassesWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// STUDENT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StudentOptionalDefaultsRelations = {
  Classes?: ClassesOptionalDefaultsWithRelations | null;
};

export type StudentOptionalDefaultsWithRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentOptionalDefaultsRelations

export const StudentOptionalDefaultsWithRelationsSchema: z.ZodType<StudentOptionalDefaultsWithRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  Classes: z.lazy(() => ClassesOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// STUDENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type StudentPartialRelations = {
  Classes?: ClassesPartialWithRelations | null;
};

export type StudentPartialWithRelations = z.infer<typeof StudentPartialSchema> & StudentPartialRelations

export const StudentPartialWithRelationsSchema: z.ZodType<StudentPartialWithRelations> = StudentPartialSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).nullish(),
})).partial()

export type StudentOptionalDefaultsWithPartialRelations = z.infer<typeof StudentOptionalDefaultsSchema> & StudentPartialRelations

export const StudentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StudentOptionalDefaultsWithPartialRelations> = StudentOptionalDefaultsSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).nullish(),
}).partial())

export type StudentWithPartialRelations = z.infer<typeof StudentSchema> & StudentPartialRelations

export const StudentWithPartialRelationsSchema: z.ZodType<StudentWithPartialRelations> = StudentSchema.merge(z.object({
  Classes: z.lazy(() => ClassesPartialWithRelationsSchema).nullish(),
}).partial())

export default StudentSchema;
